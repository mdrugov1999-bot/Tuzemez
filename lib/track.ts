
/**
 * Simple analytics abstraction.
 * Replace console.log with real GA4/Yandex.Metrika/FB Pixel calls.
 */
export const track = (event: string, props?: Record<string, any>) => {
  console.log(`[Analytics] ${event}`, props);
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event,
      ...props
    });
  }
};

export enum Events {
  HeroCtaClicked = 'hero_cta_clicked',
  PurchaseStarted = 'purchase_started',
  LeadMagnetStarted = 'lead_magnet_started',
  LeadMagnetCompleted = 'lead_magnet_completed',
  CalculatorCompleted = 'calculator_completed',
  FaqOpened = 'faq_opened',
  SocialLinkVisited = 'social_link_visited'
}
