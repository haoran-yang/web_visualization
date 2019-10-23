from rest_framework import serializers
from Ins_app1.models import pass_ratio, score_propor, fpd_ratio

class InsScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = pass_ratio
        fields = ('apply_dt','loan_nums','pass_ratio')

class InsScoreSerializer2(serializers.ModelSerializer):
    class Meta:
        model = pass_ratio
        fields = ('prod_line','type_name','type_value','apply_dt','loan_nums','pass_ratio','ins_score')

class ProporSerializer(serializers.ModelSerializer):
    class Meta:
        model = score_propor
        fields = ('apply_dt','score_propor','ins_score')

class FpdSerializer(serializers.ModelSerializer):
    class Meta:
        model = fpd_ratio
        fields = ('apply_mth','zc_nums','fpd_ratio','ins_score')