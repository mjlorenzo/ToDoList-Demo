# Generated by Django 2.1.1 on 2018-09-11 22:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ToDoItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('desc', models.CharField(max_length=100)),
                ('complete', models.BooleanField()),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]