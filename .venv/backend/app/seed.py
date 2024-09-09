from app import create_app, db
from app.models import User, Booking, Payment  # Import your models

app = create_app()

def seed_data():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Add initial data
        users = [
            User(email='user1@example.com', password='hashed_password1'),
            User(email='user2@example.com', password='hashed_password2')
        ]
        
        bookings = [
            Booking(date='2024-09-15', time='10:00 AM', movers=3, user_id=1),
            Booking(date='2024-09-16', time='02:00 PM', movers=2, user_id=2)
        ]
        
        payments = [
            Payment(amount='150.00', status='confirmed', payment_id='PAYMENTID123', payer_id='PAYERID123'),
            Payment(amount='200.00', status='confirmed', payment_id='PAYMENTID456', payer_id='PAYERID456')
        ]

        # Add data to the session
        db.session.add_all(users)
        db.session.add_all(bookings)
        db.session.add_all(payments)
        
        # Commit the session
        db.session.commit()
        
        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_data()
