from django.db import models

# Create your models here.
class pass_ratio(models.Model):
    """ Ins分数表 """
    id = models.AutoField(primary_key=True)
    prod_line = models.CharField(max_length=20, verbose_name='产品线')
    apply_dt = models.CharField(max_length=20, verbose_name='申请日期')
    ins_score = models.CharField(max_length=20, verbose_name='ins分数')
    type_name = models.CharField(max_length=20, verbose_name='类别,如:省份')
    type_value = models.CharField(max_length=20, verbose_name='类别值,如:云南省')
    loan_nums = models.IntegerField(verbose_name='进件量')
    pass_ratio = models.FloatField(verbose_name='通过率',null=True)
    createDateTime = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ('-createDateTime',)
    def __str__(self):
        return self.prod_line #默认使用prod_line来显示主题信息

class score_propor(models.Model):
    """ 分数占比表 """
    id = models.AutoField(primary_key=True)
    prod_line = models.CharField(max_length=20, verbose_name='产品线')
    apply_dt = models.CharField(max_length=20, verbose_name='申请日期')
    ins_score = models.CharField(max_length=20, verbose_name='ins分数')
    type_name = models.CharField(max_length=20, verbose_name='类别,如:省份')
    type_value = models.CharField(max_length=20, verbose_name='类别值,如:云南省')
    score_propor = models.FloatField(verbose_name='占比',null=True)
    createDateTime = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ('-createDateTime',)
    def __str__(self):
        return self.prod_line #默认使用prod_line来显示主题信息

class fpd_ratio(models.Model):
    """ 首逾表 """
    id = models.AutoField(primary_key=True)
    prod_line = models.CharField(max_length=20, verbose_name='产品线')
    apply_mth = models.CharField(max_length=20, verbose_name='申请月')
    ins_score = models.CharField(max_length=20, verbose_name='ins分数')
    type_name = models.CharField(max_length=20, verbose_name='类别,如:省份')
    type_value = models.CharField(max_length=20, verbose_name='类别值,如:云南省')
    zc_nums = models.IntegerField(verbose_name='注册量')
    fpd_ratio = models.FloatField(verbose_name='首逾率',null=True)
    createDateTime = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ('-createDateTime',)
    def __str__(self):
        return self.prod_line