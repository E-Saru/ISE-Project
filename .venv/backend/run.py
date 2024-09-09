# # from app import create_app, db
# # from flask_migrate import Migrate

# # app = create_app()
# # migrate = Migrate(app, db)

# # if __name__ == "__main__":
# #     app.run(debug=True)


# import sys
# import os
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend')))

# from app import create_app, db


# from flask_migrate import Migrate

# app = create_app()
# migrate = Migrate(app, db)

# if __name__ == "__main__":
#     app.run(debug=True)



import sys
import os

# Add the backend directory to Python's module search path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from app import create_app, db  # Now Python can find 'app'
from flask_migrate import Migrate

app = create_app()
migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(debug=True)
