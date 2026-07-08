from rest_framework import serializers
from wagtail.rich_text import expand_db_html

from . import HomePage
from .base_serializer import BasePageSerializer


class HomePageSerializer(BasePageSerializer):
    about_me = serializers.SerializerMethodField()

    class Meta:
        model = HomePage
        fields = BasePageSerializer.Meta.fields + ["about_me"]

    def get_about_me(self, page):
        return expand_db_html(page.about_me)
