# Generated by Django 5.0.3 on 2024-06-03 14:05

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('search_feature', '0019_alter_dislikereview_user_alter_likereview_user'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='dislikereview',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='likereview',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='dislikereview',
            unique_together={('user', 'review_id')},
        ),
        migrations.AlterUniqueTogether(
            name='likereview',
            unique_together={('user', 'review_id')},
        ),
    ]
