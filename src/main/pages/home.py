from django.utils.translation import gettext_lazy as _
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from wagtail.models import PageManager
from wagtail_headless_preview.models import HeadlessPreviewMixin

from .base import BasePage


class HomePage(HeadlessPreviewMixin, BasePage):
    about_me = RichTextField(blank=True, verbose_name=_("About me"))

    content_panels = BasePage.content_panels + [FieldPanel("about_me")]

    extra_panels = BasePage.extra_panels
    serializer_class = "main.pages.HomePageSerializer"

    objects: PageManager

    class Meta:
        verbose_name = _("Home")
