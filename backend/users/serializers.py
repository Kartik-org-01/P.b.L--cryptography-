from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)  # confirm password field

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'age', 'dob', 'gender', 'night_mode', 'anonymous_mode')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            age=validated_data.get('age'),
            dob=validated_data.get('dob'),
            gender=validated_data.get('gender', 'Other'),
            night_mode=validated_data.get('night_mode', False),
            anonymous_mode=validated_data.get('anonymous_mode', False),
        )
        return user
