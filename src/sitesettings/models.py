from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
from wagtail.fields import RichTextField


@register_setting
class SiteSetting(BaseSiteSetting):
    name: models.CharField = models.CharField(
        max_length=255,
        blank=True,
        verbose_name=_("Name"),
        help_text=_('Shown in the whoami card, e.g. "Your Name".'),
    )
    role: models.CharField = models.CharField(
        max_length=255,
        blank=True,
        verbose_name=_("Role"),
        help_text=_('e.g. "software dev".'),
    )
    open_to: models.CharField = models.CharField(
        max_length=255,
        blank=True,
        verbose_name=_("Open to"),
        help_text=_('e.g. "cool things".'),
    )

    gtm_id: models.CharField = models.CharField(max_length=50, blank=True)
    google_site_verification: models.CharField = models.CharField(
        max_length=255, blank=True
    )

    cookie_content = RichTextField(
        blank=True, null=True, verbose_name=_("Cookie bar content"), features=[]
    )

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("name"),
                FieldPanel("role"),
                FieldPanel("open_to"),
            ],
            heading=_("Identity"),
        ),
        FieldPanel("gtm_id"),
        FieldPanel("google_site_verification"),
        FieldPanel("cookie_content"),
    ]

    def __str__(self):
        return str(self.site)

    class Meta:
        verbose_name = _("Site setting")
        verbose_name_plural = _("Site settings")
