from flask import Blueprint, render_template

# blueprint
letter_bp = Blueprint('letter', __name__)

@letter_bp.route('/letter')
def get_letter():
    return render_template('letters.html')