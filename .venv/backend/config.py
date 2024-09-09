# config.py

# Flask configuration
SECRET_KEY = 'your-secret-key'
JWT_SECRET_KEY = 'your-jwt-secret-key'
SQLALCHEMY_DATABASE_URI = 'sqlite:///movers.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False

PAYPAL_CLIENT_ID = 'AbS4ilAHZC7R97S_E1wKuJl7XpgYI7sNln9srjpQSUaAkTtu4dA3soRdWICuHbsalROz4dkWbT21m93U'
PAYPAL_CLIENT_SECRET = 'EEtIMQhmBrDpntG3u3DbFuT_308aK_2UtIT7tkMwQx8aaTChV8gilfv8anOwxb8_bDJuIlsivZlnF-DT'
PAYPAL_MODE = 'sandbox'  # Use 'live' for production
