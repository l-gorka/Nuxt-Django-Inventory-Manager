from django.db import models
from django.core.validators import MinLengthValidator
from cloudinary.models import CloudinaryField


class Pen(models.Model):

    name = models.CharField(max_length=50, validators=[MinLengthValidator(3, "Name must have at least 3 characters.")])
    amount = models.IntegerField()
    image = CloudinaryField('image', folder='pens/', use_filename=True , blank=True, null=True)

    def __str__(self) -> str:
        return self.name