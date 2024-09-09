from django.urls import path
from .views import loginView, registerView, CookieTokenRefreshView, logoutView, user, wallet_balance_view

app_name = "user"

urlpatterns = [
    path('login', loginView),
    path('register', registerView),
    path('refresh-token', CookieTokenRefreshView.as_view()),
    path('logout', logoutView),
    path('user', user),
    path('wallet-balance', wallet_balance_view, name='wallet_balance'),
]
