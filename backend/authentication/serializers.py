from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {                     # optiuni suplimentare pentru filed-uri
            'password': {'write_only': True} # permite doar scrierea, adica nu vom transmite si parola mai departe
        }

    def create(self, validated_data):  # cand se face save
        password = validated_data.pop('password', None)
        instance_of_model = self.Meta.model(**validated_data)
        if password is not None:
            instance_of_model.set_password(password)
        instance_of_model.save()
        return instance_of_model
