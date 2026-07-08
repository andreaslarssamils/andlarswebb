from rest_framework import serializers

from sitesettings.models import SiteSetting


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = [
            "name",
            "role",
            "open_to",
            "gtm_id",
            "google_site_verification",
            "cookie_content",
        ]
