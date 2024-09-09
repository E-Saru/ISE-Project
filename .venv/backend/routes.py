# routes.py
from flask import Blueprint, request, jsonify, redirect, url_for, current_app as app
from app.models import User, Booking, Payment
from app import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import paypalrestsdk
from werkzeug.security import generate_password_hash, check_password_hash
from flask_dance.contrib.google import make_google_blueprint, google
from config import PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_MODE

# Define blueprints
api_bp = Blueprint('api', __name__)
auth_bp = Blueprint('auth', __name__)

# Configure PayPal SDK
paypalrestsdk.configure({
    "mode": PAYPAL_MODE,  # sandbox or live
    "client_id": PAYPAL_CLIENT_ID,
    "client_secret": PAYPAL_CLIENT_SECRET
})

# Define Google OAuth blueprint
google_bp = make_google_blueprint(
    client_id='your-client-id',
    client_secret='your-client-secret',
    redirect_to='google_login'
)

# Authentication routes
@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'User already exists'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/login/google')
def google_login():
    if not google.authorized:
        return redirect(url_for('google.login'))
    
    resp = google.get('/oauth2/v2/userinfo')
    if not resp.ok:
        return jsonify({'error': 'Failed to fetch user info from Google'}), 400
    
    email = resp.json().get("email")
    if not email:
        return jsonify({'error': 'Failed to get email from Google'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(email=email, password=None)
        db.session.add(user)
        db.session.commit()

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

# API routes
@api_bp.route('/book', methods=['POST'])
@jwt_required()
def book_movers():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()  # Get the user ID from the JWT
        booking = Booking(
            date=data['date'], 
            time=data['time'], 
            movers=data['movers'], 
            user_id=user_id  # Use JWT user ID instead of passing it manually
        )
        db.session.add(booking)
        db.session.commit()
        return jsonify({'message': 'Booking successful'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@api_bp.route('/pay', methods=['POST'])
@jwt_required()
def process_payment():
    try:
        data = request.get_json()
        amount = data.get('amount')  # Amount should be in USD
        return_url = 'http://localhost:5000/api/payment/execute'
        cancel_url = 'http://localhost:5000/api/payment/cancel'

        # Create a PayPal payment
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": return_url,
                "cancel_url": cancel_url
            },
            "transactions": [{
                "amount": {
                    "total": amount,
                    "currency": "USD"
                },
                "description": "Booking payment"
            }]
        })

        if payment.create():
            # Find approval URL for redirecting user to PayPal
            approval_url = next(link.href for link in payment.links if link.rel == 'approval_url')
            return jsonify({'paymentID': payment.id, 'approvalURL': approval_url}), 200
        else:
            return jsonify({'error': payment.error}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/payment/execute', methods=['GET'])
@jwt_required()
def execute_payment():
    try:
        payment_id = request.args.get('paymentId')
        payer_id = request.args.get('PayerID')

        payment = paypalrestsdk.Payment.find(payment_id)
        if payment.execute({"payer_id": payer_id}):
            # Log the payment in the database
            db.session.add(Payment(
                amount=payment.transactions[0].amount.total,
                status='confirmed',
                payment_id=payment_id,
                payer_id=payer_id
            ))
            db.session.commit()
            return jsonify({'message': 'Payment successful'}), 200
        else:
            return jsonify({'error': payment.error}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api_bp.route('/payment/cancel', methods=['GET'])
@jwt_required()
def cancel_payment():
    return jsonify({'message': 'Payment cancelled'}), 200
