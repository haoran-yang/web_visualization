from django.urls import path
from Ins_app1 import views

urlpatterns = [
            path('pass_ratio/',views.Ins_passRatio, name='pass_ratio'),
            path('ins_propor/',views.Ins_propor, name='ins_propor'),
            path('fpd_ratio/',views.Fpd_ratio, name='fpd_ratio'),

            path('abn_pass_ratio/',views.Abn_passRatio, name='abn_pass_ratio'),

            path('index/', views.Index, name='index'),
            path('v1/api/ins_score/', views.InsScore_api),
            path('v1/api/ins_propor/', views.InsPropor_api),
            path('v1/api/fpd_ratio/', views.FpdRatio_api),
            ]