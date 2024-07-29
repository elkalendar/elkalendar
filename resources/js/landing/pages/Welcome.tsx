import React from 'react';
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu';
import {HeroBullets} from "@/components/HeroBullets";
import {FooterLinks} from "@/components/FooterLinks";
import {FeaturesGrid} from "@/components/FeaturesGrid";

function Welcome() {
  return (
    <div>
      <HeaderMegaMenu />
      <HeroBullets />
      <FeaturesGrid />
      <FooterLinks />
    </div>
  );
}

export default Welcome;
