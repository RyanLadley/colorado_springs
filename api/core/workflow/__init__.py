from flask import Blueprint

#workflow is the basic api request apperatus
#it contains the smallest units of requests that wrappers like page use
#accessed using /api/<request>

workflow = Blueprint('workflow', __name__)