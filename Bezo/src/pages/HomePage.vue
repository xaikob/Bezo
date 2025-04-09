<template>
  <div>
    <HeaderComponent />
    <HeroSectionHome />
    <AboutSectionHome />
    <CoursesPreviewHome />
    <AdvantagesSection />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/layout/NavBar.vue'
import HeroSectionHome from '@/components/layout/HeroSectionHome.vue'
import AboutSectionHome from '@/components/layout/AboutSectionHome.vue'
import CoursesPreviewHome from '@/components/layout/CoursesPreviewHome.vue'
import AdvantagesSection from '@/components/layout/AdvantagesSection.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'


export default {
  components: {
    HeaderComponent,
    HeroSectionHome,
    AboutSectionHome,
    CoursesPreviewHome,
    AdvantagesSection,
    FooterComponent
  }
}
</script>
