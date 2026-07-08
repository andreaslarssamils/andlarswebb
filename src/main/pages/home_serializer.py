from rest_framework import serializers
from wagtail.rich_text import expand_db_html

from customimage.serializers import get_image_serializer

from . import HomePage
from .base_serializer import BasePageSerializer
from .home import HomePageProject


class HomePageProjectSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = HomePageProject
        fields = ["title", "description", "url", "image"]

    def get_image(self, obj):
        if not obj.image:
            return None
        return get_image_serializer([("thumb", "fill-96x96")])(obj.image).data


class HomePageSerializer(BasePageSerializer):
    about_me = serializers.SerializerMethodField()
    projects = serializers.SerializerMethodField()

    class Meta:
        model = HomePage
        fields = BasePageSerializer.Meta.fields + ["about_me", "projects"]

    def get_about_me(self, page):
        return expand_db_html(page.about_me)

    def get_projects(self, page):
        return HomePageProjectSerializer(page.projects.all(), many=True).data
