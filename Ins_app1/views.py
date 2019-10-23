from django.shortcuts import render
from Ins_app1.models import pass_ratio, score_propor, fpd_ratio
from Ins_app1.serializers import InsScoreSerializer,InsScoreSerializer2, ProporSerializer, FpdSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status

# Create your views here.
def Ins_passRatio(request):
    return render(request, 'Ins_passRatio.html')

def Ins_propor(request):
    return render(request, 'Ins_propor.html')

def Fpd_ratio(request):
    return render(request, 'Fpd_ratio.html')

def Abn_passRatio(request):
    return render(request, 'Abn_passRatio.html')

def Index(request):
    return render(request, 'index.html')

@api_view(['POST'])
def InsScore_api(request):
    if request.method == 'POST':
        prod_line = request.POST.get('prod_line')
        type_name = request.POST.get('type_name')
        type_value = request.POST.get('type_value')
        ins_score = request.POST.get('ins_score')
        if prod_line and type_value and type_name and ins_score:
            data = pass_ratio.objects.filter(prod_line=prod_line,type_name=type_name,type_value=type_value,ins_score=ins_score).order_by('apply_dt')
            if data:
                serializer = InsScoreSerializer(data, many=True)
                return Response({'code': 0, 'data': serializer.data})
            else:
                return Response({'code': 1, 'data': []})
        elif prod_line == 'filter':
            data = pass_ratio.objects.order_by('-apply_dt')
            if data:
                serializer = InsScoreSerializer2(data, many=True)
                return Response({'code': 0, 'data': serializer.data})
            else:
                return Response({'code': 1, 'data': []})
        else:
            return JsonResponse({'info': 'para is null'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'info': '请求方法错误，使用POST'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def InsPropor_api(request):
    if request.method == 'POST':
        prod_line = request.POST.get('prod_line')
        type_name = request.POST.get('type_name')
        type_value = request.POST.get('type_value')
        if prod_line and type_value and type_name:
            data = score_propor.objects.filter(prod_line=prod_line,type_name=type_name,type_value=type_value).order_by('apply_dt')
            if data:
                serializer = ProporSerializer(data, many=True)
                return Response({'code': 0, 'data': serializer.data})
            else:
                return Response({'code': 1, 'data': []})
        else:
            return JsonResponse({'info': 'para is null'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'info': '请求方法错误，使用POST'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def FpdRatio_api(request):
    if request.method == 'POST':
        prod_line = request.POST.get('prod_line')
        type_name = request.POST.get('type_name')
        type_value = request.POST.get('type_value')
        if prod_line and type_value and type_name:
            data = fpd_ratio.objects.filter(prod_line=prod_line,type_name=type_name,type_value=type_value).order_by('apply_mth')
            if data:
                serializer = FpdSerializer(data, many=True)
                return Response({'code': 0, 'data': serializer.data})
            else:
                return Response({'code': 1, 'data': []})
        else:
            return JsonResponse({'info': 'para is null'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'info': '请求方法错误，使用POST'}, status=status.HTTP_400_BAD_REQUEST)