from django.db import models
from django.utils.translation import gettext_lazy as _
from modelcluster.fields import ParentalKey
from wagtail.admin.panels import FieldPanel, InlinePanel
from wagtail.fields import RichTextField
from wagtail.models import Orderable, PageManager
from wagtail_headless_preview.models import HeadlessPreviewMixin

from .base import BasePage


class HomePage(HeadlessPreviewMixin, BasePage):
    about_me = RichTextField(blank=True, verbose_name=_("About me"))

    content_panels = BasePage.content_panels + [
        FieldPanel("about_me"),
        InlinePanel("projects", label=_("Projects")),
    ]

    extra_panels = BasePage.extra_panels
    serializer_class = "main.pages.HomePageSerializer"

    objects: PageManager

    class Meta:
        verbose_name = _("Home")


class HomePageProject(Orderable):
    page = ParentalKey(
        HomePage, on_delete=models.CASCADE, related_name="projects"
    )
    title = models.CharField(max_length=255, verbose_name=_("Title"))
    description = models.CharField(
        max_length=255, blank=True, verbose_name=_("Description")
    )
    url = models.URLField(blank=True, verbose_name=_("URL"))
    image = models.ForeignKey(
        "customimage.CustomImage",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name=_("Image"),
    )

    panels = [
        FieldPanel("title"),
        FieldPanel("description"),
        FieldPanel("url"),
        FieldPanel("image"),
    ]

    def __str__(self):
        return self.title
