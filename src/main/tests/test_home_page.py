from wagtail.test.utils import WagtailPageTests

from customimage.factories import CustomImageFactory
from main.factories.home_page import HomePageFactory
from main.pages.home import HomePageProject
from main.pages.home_serializer import HomePageProjectSerializer, HomePageSerializer


class HomePageProjectSerializerTest(WagtailPageTests):
    def setUp(self):
        self.home = HomePageFactory.create(title="Home", parent=None)

    def test_serializes_fields_and_image_rendition(self):
        image = CustomImageFactory.create()
        project = HomePageProject.objects.create(
            page=self.home,
            title="project_alpha",
            description="A cool thing",
            url="https://example.com",
            image=image,
        )

        data = HomePageProjectSerializer(project).data

        self.assertEqual(data["title"], "project_alpha")
        self.assertEqual(data["description"], "A cool thing")
        self.assertEqual(data["url"], "https://example.com")
        self.assertIn("thumb", data["image"]["renditions"])
        self.assertTrue(data["image"]["renditions"]["thumb"]["src"])

    def test_image_is_none_without_image(self):
        project = HomePageProject.objects.create(
            page=self.home,
            title="open_source_thing",
        )

        data = HomePageProjectSerializer(project).data

        self.assertIsNone(data["image"])

    def test_home_serializer_includes_projects(self):
        HomePageProject.objects.create(
            page=self.home,
            title="project_alpha",
            url="https://example.com",
        )

        result = HomePageSerializer().get_projects(self.home)

        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]["title"], "project_alpha")
