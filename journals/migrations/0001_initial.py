# Generated by Django 5.0.3 on 2024-05-04 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Journal',
            fields=[
                ('journal_id', models.AutoField(primary_key=True, serialize=False)),
                ('journal_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_id', models.IntegerField()),
                ('tag_id', models.CharField()),
                ('title', models.CharField(max_length=200)),
                ('entry_date', models.DateField(auto_now_add=True, verbose_name='Date published')),
                ('last_modified_date', models.DateField(auto_now=True, verbose_name='Last modified')),
                ('entry_date', models.DateField(auto_now_add=True, verbose_name='Date published')),
                ('last_modified_date', models.DateField(auto_now=True, verbose_name='Last modified')),
                ('content', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('tag_id', models.IntegerField(primary_key=True, serialize=False, verbose_name='Tag ID')),
                ('journal_id', models.IntegerField()),
                ('tag_name', models.CharField(max_length=200)),
                ('tag_color', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('tag_id', models.IntegerField(primary_key=True, serialize=False, verbose_name='Tag ID')),
                ('journal_id', models.IntegerField()),
                ('tag_name', models.CharField(max_length=200)),
                ('tag_color', models.CharField(max_length=10)),
            ],
        ),
    ]
