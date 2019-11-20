from django.db import models

# Create your models here.
class pass_ratio(models.Model):
    """ 表1 """
    id = models.AutoField(primary_key=True)
    prod_line = models.CharField(max_length=20, verbose_name='类别1')
    apply_dt = models.CharField(max_length=20, verbose_name='日期')
    ins_score = models.CharField(max_length=20, verbose_name='分数')
    type_name = models.CharField(max_length=20, verbose_name='类别2')
    type_value = models.CharField(max_length=20, verbose_name='类别3')
    loan_nums = models.IntegerField(verbose_name='量')
    pass_ratio = models.FloatField(verbose_name='率',null=True)
    createDateTime = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ('-createDateTime',)
    def __str__(self):
        return self.prod_line #默认使用prod_line来显示主题信息

class score_propor(models.Model):
    """ 表2 """
    id = models.AutoField(primary_key=True)
    prod_line = models.CharField(max_length=20, verbose_name='类别1')
    apply_dt = models.CharField(max_length=20, verbose_name='日期')
    ins_score = models.CharField(max_length=20, verbose_name='分数')
    type_name = models.CharField(max_length=20, verbose_name='类别2')
    type_value = models.CharField(max_length=20, verbose_name='类别3')
    score_propor = models.FloatField(verbose_name='占比',null=True)
    createDateTime = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ('-createDateTime',)
    def __str__(self):
        return self.prod_line #默认使用prod_line来显示主题信息

class fpd_ratio(models.Model):
    """ 表3 """
    id = models.AutoField(primary_key=True)
    prod_line = models.CharField(max_length=20, verbose_name='类别1')
    apply_mth = models.CharField(max_length=20, verbose_name='月')
    ins_score = models.CharField(max_length=20, verbose_name='分数')
    type_name = models.CharField(max_length=20, verbose_name='类别2')
    type_value = models.CharField(max_length=20, verbose_name='类别3')
    zc_nums = models.IntegerField(verbose_name='量')
    fpd_ratio = models.FloatField(verbose_name='率',null=True)
    createDateTime = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ('-createDateTime',)
    def __str__(self):
        return self.prod_line