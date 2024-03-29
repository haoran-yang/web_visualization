# Generated by Django 2.2.6 on 2019-10-22 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Ins_app1', '0004_score_propor'),
    ]

    operations = [
        migrations.CreateModel(
            name='fpd_ratio',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('prod_line', models.CharField(max_length=20, verbose_name='产品线')),
                ('apply_mth', models.CharField(max_length=20, verbose_name='申请月')),
                ('ins_score', models.CharField(max_length=20, verbose_name='ins分数')),
                ('type_name', models.CharField(max_length=20, verbose_name='类别,如:省份')),
                ('type_value', models.CharField(max_length=20, verbose_name='类别值,如:云南省')),
                ('zc_nums', models.IntegerField(verbose_name='注册量')),
                ('fpd_ratio', models.FloatField(null=True, verbose_name='首逾率')),
                ('createDateTime', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('-createDateTime',),
            },
        ),
    ]
