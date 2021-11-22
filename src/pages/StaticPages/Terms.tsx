import { FC } from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";

const About: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2" color="text.primary" sx={{ mt: 2 }}>
            Romingo
          </Typography>
        </Box>
        <Divider variant="middle" light sx={{ my: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Terms of Use
          </Typography>
        </Divider>
        <Typography variant="body1" color="text.primary">
          Accessing the Romingo website (“Site”) constitutes your agreement to
          the following Terms or Use (“Terms”). You should read these Terms and
          our <Link href="privacy">privacy policy</Link> in their entirety
          before accessing, using, or obtaining information or services from the
          Site. Our terms include important legal obligations and waivers
          INCLUDING AN ARBITRATION CLAUSE AND WAIVER OF CLASS ACTION that you
          agree to in exchange for the use of our Site. If you do not agree with
          all of the Terms and our privacy policy, you may not access the Site
          or use our services. Within the term “we”, “us”, “our” and Romingo
          refer to JZ Partners LLC d/b/a Romingo a California limited liability
          company. The terms “you” and “your” and “user” refer to you the user
          of the Site. You acknowledge and agree that we may change these Terms
          from time to time and that those changes become effective immediately.
          If we make material changes, we will provide you notice. The newest
          version of our Terms will always be posted on the Site. Your continued
          use of our services following the notice of any changes constitutes
          your acceptance and agreement to be bound by such changes. If you
          object to any changes, you must immediately discontinue using the
          Site.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Using the Website
        </Typography>
        <Typography variant="body1" color="text.primary">
          The Site is currently made available to you for your personal,
          non-commercial use. When you access our site in any way, you warrant
          that you are at least 18 years of age and possess the legal authority
          to enter into a binding agreement and that you will only use the Site
          in accordance with all the terms and conditions herein. You agree to
          be financially responsible for all of your use of the Site (as well as
          for use of your account by others). You agree that you are responsible
          for any bookings made by persons under your direction or control. You
          also warrant that all information supplied by you or on your behalf,
          or by members of your household in using the Site is true and
          accurate. Further you also confirm that the traveler is not an
          unaccompanied minor. You agree to only make legitimate reservations or
          purchases for you or for another person for whom you are legally
          authorized to act. We have the right at all times to deny you use or
          access to the site for any reason.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          What we Do
        </Typography>
        <Typography variant="body1" color="text.primary">
          With the leisure, drive-market travel on the rise, Romingo aims to
          answer the question that many households are posed with, “where can I
          find a hotel that is truly pet-friendly for my next trip”? Romingo
          accomplishes this by partnering with hotels to make the guest
          experience while traveling with their dogs more enjoyable and
          worry-free. We are an online travel community platform that creates
          awareness around an exclusive collection of truly pet-friendly hotels.
          Our travel agency utilizes its extensive digital marketing expertise
          to reach this niche group of pet-friendly travelers, and to spread the
          word that pet-friendly travel is finally here!
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          We do not own or otherwise control the Hotel Products
        </Typography>
        <Typography variant="body1" color="text.primary">
          Our Website is a travel search engine designed to allow you to search
          and book hotel accommodations. Romingo does not provide, own, or
          control any of the accommodations that you can access on the Site. The
          accommodations are owned, controlled, or made available by third
          parties (the “Accommodation Supplier”). The Accommodation Suppliers
          are responsible for the accommodations. The Accommodation Supplier’s
          terms and conditions, and privacy policies apply to your booking and
          travel so you must agree to and understand those terms and conditions
          and privacy policies. By booking the accommodation and/or utilizing
          the services of the accommodation, you agree that neither Romingo, or
          its members, employees, agents, representatives, or assigns are or may
          be liable for any loss, injury, or damage to you or your belongings,
          or otherwise, in connection with any service supplied or not supplied
          resulting directly or indirectly from any occurrence beyond the
          control of Romingo. Romingo shall not be liable for any injury,
          damage, or loss resulting from the negligence of any Accommodation
          Supplier or other person supplying services. Romingo hold themselves
          free of responsibility for any damage(s) from any cause(s) whatsoever.
          While our Site displays information regarding many accommodations,
          this is in no way meant to suggest or imply or in any way communicate
          our recommendation, approval, affiliation, partnership, or sponsorship
          of the accommodation or the Accommodation Supplier. Your interaction
          with any Accommodation Supplier accessed through the Site is at your
          own risk.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Accommodation Supplier Pet Policy and Pet Fees
        </Typography>
        <Typography variant="body1" color="text.primary">
          We have worked hard to find Accommodation Suppliers who want to be as
          pet-friendly as possible. Our Accommodation Suppliers have agreed to
          accept 2 dogs up to 75 pounds each. Should your dog not meet the
          weight limit, or should you have more than two dogs, the Accommodation
          Supplier may cancel your reservation for which you will not be
          entitled to a refund. The Accommodation Supplier may charge a
          refundable pet deposit. To be eligible for a refund of the deposit,
          you must follow all of the policies and procedure the Accommodation
          Supplier has in place for it pet guests and you must not leave the
          room damaged or requiring deep cleaning. If an Accommodation Supplier
          unreasonably withholds a refund, please contact us and we will liaise
          between you and the Accommodation Supplier in attempting to obtain a
          refund, but we will have no further liability to you. Some of our
          Accommodation Suppliers may have policies and procedures with regards
          to excessive noise, using a leash, having specific areas for pets to
          relieve themselves, or other rules with regard to pets on the
          premises. It is your responsibility to learn and abide by these
          policies and procedures. Failure to follow any policy or procedure
          could result in the withholding of your deposit or your eviction from
          the hotel, with no refund, at the sole discretion of the Accommodation
          Supplier. We are not responsible for any such decision, and we shall
          not be liable for any measures taken by an Accommodation Supplier for
          your failure to abide by the policies and procedures. If Romingo’s
          suppliers notify us of more than two instances of failure to follow
          policies and procedures or leaving damaged rooms or rooms that require
          excessive cleaning, you shall lose any membership with Romingo and
          shall not be allowed to book with us in the future.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Health Department Rules
        </Typography>
        <Typography variant="body1" color="text.primary">
          Please be aware that rules and regulations of local health departments
          remain in effect and your pet may not be allowed into Accommodation
          restaurants, spas, outlets, etc. in accordance with these rules. You
          are responsible for understanding these rules and must not rely on
          Romingo to communicate these rules to you. You should plan your
          vacation accordingly.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Accommodation Supplier Descriptions/Amenities/Images
        </Typography>
        <Typography variant="body1" color="text.primary">
          While we exercise due diligence in the selection of our partners,
          hotel, and other accommodation profiles are based on information
          provided to us by the Accommodation Supplier. This includes images and
          descriptions of the properties and rooms, and all information with
          regard to pet friendly accommodations. Additionally, you should be
          aware that star ratings or similar systems are based on country
          classifications and therefore can differ. While Romingo does its best
          to maintain current and accurate information regarding these
          Accommodation Suppliers, we cannot be held responsible for any
          inaccuracies in supplier descriptions, amenities, or images.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Membership Accounts
        </Typography>
        <Typography variant="body1" color="text.primary">
          As part of our Service, we may offer membership accounts and may
          change the features from time to time. If you sign up for a membership
          plan, you agree to the terms, conditions and limitations associated
          with them that are posted on our websites or applications. You may
          only use and register to become a member of Our Website if you are
          over the age of eighteen (18) and can enter into binding contracts. If
          you become a member, you are responsible for maintaining the
          confidentiality of your passwords, login, and account information. You
          will be responsible for all use of Our Website by you, anyone using
          your password and login information (with or without your permission)
          and anyone who you allow to access your purchased content. If at any
          time you have reason to believe that your account is no longer secure
          (through for example: loss, theft, identity theft, hacking, or
          unauthorized disclosure or use of your information or computer or
          mobile device used to access Our Website), you are solely responsible
          to promptly change any and all of your Personal information that is
          affected. We reserve the right to accept or refuse membership or to
          restrict use of the Site in our discretion. You may not transfer or
          assign your membership or any Site benefits. We may take actions we
          deem reasonably necessary to prevent fraud and abuse, including
          placing restrictions on the amount of content or other services that
          can be accessed from the Service at any one time.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Membership Cancellation
        </Typography>
        <Typography variant="body1" color="text.primary">
          You may cancel your membership plan by visiting your account details
          page and adjusting your membership settings, or by contacting our
          Customer Service team. If you cancel your membership or subscription,
          you will not receive a refund of any bookings currently made with one
          of the Suppliers.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Pricing
        </Typography>
        <Typography variant="body1" color="text.primary">
          Rates: The rates displayed on the Site are a combination of the rates
          and fees charged by the Accommodation Supplier supplying your
          accommodations, such as the hotel or hotel supplier. Accommodation
          Supplier’s Fees and Charges – There are other charges that the
          Accommodation Supplier may charge you, such as a refundable pet
          deposit or resort fee, that are not included in the amounts we collect
          from you. You will have to pay those charges directly to the
          Accommodation Supplier. Before booking, you should check with the
          Accommodation Supplier to determine whether they charge additional
          fees upon your arrival. Taxes - In addition to the rate and our
          service fee, our Site displays a line item for “Taxes and Fees,” which
          you will be charged when making your reservation. “Taxes and Fees”
          consists of: (i) an estimate of the taxes payable by the hotel in
          connection with your booking, including, but not limited to, sales and
          use tax, occupancy tax, room tax, excise tax, value added tax and/or
          other similar taxes; and (ii) if applicable, taxes payable by our
          Booking Partner in connection with your booking. We do not collect
          taxes for remittance to applicable taxing authorities. The hotel is
          responsible for remitting applicable taxes. In certain jurisdictions,
          our Booking Partner may also be responsible for remitting taxes
          related to your booking. We do not act as a co-vendor with each other
          or with any hotel. Taxability and the applicable tax rate vary based
          on several factors, including, but not limited to, the location of the
          hotel and the room rate paid to the hotel by our Booking Partner. The
          amount paid to the hotel for taxes in connection with your booking may
          vary from the estimated amount charged to you, depending upon the
          rates, taxability, and any other metric in effect at the time of your
          actual stay. If the amount paid to the hotel is less than the
          estimate, the balance of the charge for “Taxes and Fees” is retained
          by us and/or our Booking Partner as part of our and/or their
          compensation for facilitating and servicing your booking. “Taxes and
          Fees” does not include other charges, like hotel resort fees, hotel
          energy surcharges, parking fees, pet fees, and incidental charges
          (such as room service, mini-bar, gratuities). Unless otherwise
          indicated, these amounts will be collected from you directly by the
          hotel.
          <Typography variant="body1" sx={{ fontWeight: "bold", my: 2 }}>
            THE FINAL TOTAL PRICE DISPLAYED AT CHECK-OUT OR QUOTED BY AN AGENT
            IS THE AMOUNT YOU WILL BE CHARGED, SO PLEASE REVIEW THE FINAL TOTAL
            PRICE CAREFULLY. While we thoroughly review the pricing information
            on the Site, changes do occur, and errors are occasionally made. WE
            RESERVE THE RIGHT TO CORRECT ANY PRICING ERRORS ON THE SITE AND FOR
            PENDING RESERVATIONS. IF YOUR PENDING RESERVATION CONTAINS A PRICING
            ERROR YOU WILL BE NOTIFIED AND PROVIDED THE CHOICE TO EITHER ACCEPT
            THE CORRECTED PRICE OR CANCEL WITHOUT PENALTY.
          </Typography>
          Romingo quotes prices in US currency, based on the exchange rates for
          the respective foreign currency. Exchange rates are subject to
          fluctuation. Your exchange rate is only fixed when full payment is
          made. Additionally, your payment provider (e.g., your credit card
          company) may charge conversion fees and apply another date’s currency
          rate. Some Accommodation Suppliers may require you to present a credit
          card or cash deposit upon check-in to cover additional expenses
          incurred during your stay. Such deposit is unrelated to any payment
          received by Romingo for your booking.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Cancellation and/or Modification
        </Typography>
        <Typography variant="body1" color="text.primary">
          You may cancel or change your booking, but you will be charged the
          cancellation or change fee indicated in the terms and conditions of
          the Accommodation Supplier. If you do not cancel or change your
          reservation before the cancellation policy period applicable to the
          Accommodation Supplier, you will be subject to cancellation charges as
          outlined by that Accommodation Supplier in their terms and conditions.
          In the event of a hotel reservation for which you do not show for the
          first night of the reservation and plan to check-in for subsequent
          nights in your reservation, you must confirm the reservation changes
          with us no later than the date of the first night of the reservation
          to prevent cancellation of your reservation. You agree to pay any
          cancellation or change fees that you incur. In limited cases, some
          Accommodation Supplier do not permit changes to or cancellations of
          reservations after they are made, as indicated in the rules and
          restrictions for the Accommodation Supplier. You agree to abide by the
          Accommodation Suppliers’ terms and conditions imposed with respect to
          your booking. Our service fee is non- refundable in the case of
          cancellation or changes.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Force Majeure
        </Typography>
        <Typography variant="body1" color="text.primary">
          Romingo shall not be liable at any time, in any way, for loss, injury
          or damage arising from an act of nature, any force majeure, acts of
          government or de facto authority, government-imposed prohibitions,
          war, threat of war, civil unrest, any kind of hostilities, terrorist
          activities, industrial disputes, strikes, theft, robbery, sickness,
          health risks, pandemic, epidemic, accident, quarantine, immigration or
          customs regulations, hijacking, closure or congestion of airports or
          ports, breakdown, delay, cancellation, error, omission, inclement
          weather, storms, tempests, hurricanes, volcanic eruptions, delay or
          default of any person engaged in providing any accommodation, hotel
          closures, or any other cause beyond its control. In such cases,
          Romingo will not be responsible for any refund. Any refund you may be
          entitled to will be from the Accommodation Supplier. Accommodation
          Suppliers may choose to offer credits in lieu of a refund. We are not
          responsible for an Accommodation Supplier’s failure to pay a refund or
          for supplier bankruptcy or insolvency.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Travel Protection Coverage
        </Typography>
        <Typography variant="body1" color="text.primary">
          Romingo strongly encourages you to purchase a Travel Protection Plan
          including additional Cancel for Any Reason coverage. Such plan at a
          minimum should cover Trip Cancellation or Interruption, Cancel for Any
          Reason, Medical Expense, Emergency Evacuation/Repatriation, and
          Baggage. Travel protection plans can help protect you in the event of
          loss of non-refundable trip deposits and payments that result from
          cancellation or trip interruption (due to a covered reason such as
          injury or illness before or during the trip). It also helps with
          reimbursement for medical emergency costs (including very costly
          medical evacuation costs), missed connections and baggage loss.
          Purchasing coverage may be limited by time constraints so it is
          imperative that you purchase protection as soon as possible after
          booking.{" "}
          <span style={{ fontWeight: "bold" }}>
            If you choose to travel without adequate coverage, we will not be
            liable for any of your losses howsoever arising, for which travel
            protection plan coverage would otherwise have been available.
          </span>
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Credit Card Chargebacks
        </Typography>
        <Typography variant="body1" color="text.primary">
          All charges from Romingo should be listed on your statement as
          “Romingo” or “Romingo Travel”. In certain cases, you have the ability
          to dispute charges with credit card companies
          (&quot;chargebacks&quot;). Before initiating a chargeback, we ask you
          first to call us to discuss any questions or concerns about our
          charges. We will work with you in attempting to resolve your concerns.
          By using our service to make a reservation with an Accommodation
          Supplier, you accept and agree to the relevant cancellation policy of
          that Accommodation Supplier. Please note that certain rates or special
          offers are not eligible for cancellation or change. Romingo retains
          the right to dispute any chargeback that is improper and recover any
          costs, including attorney’s fees related to improper chargebacks.
          Additionally, in the event of an improper chargeback, we retain the
          right to cancel any travel reservation in the event of a chargeback
          related to that reservation. The following chargeback scenarios are
          improper, and we retain the right to investigate and rebut any such
          chargeback claims:
          <ul>
            <li>
              Chargebacks resulting from non-cancellable reservations, whether
              or not the reservation is used.
            </li>
            <li>
              Chargebacks resulting from charges authorized by family, friends,
              associates or other third parties with direct access to your
              credit card. This does not include credit card fraud.
            </li>
            <li>
              Chargebacks arising from inconsistency or inaccuracy with regard
              to the Accommodation Supplier’s product description.
            </li>
            <li>
              Chargebacks resulting from force majeure or other circumstances
              that are beyond the control of Romingo of the Accommodation
              Supplier.
            </li>
            <li>
              Chargebacks resulting because you do not agree with the
              cancellation policy of the Accommodation Supplier.
            </li>
          </ul>
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Destination and Travel Requirements
        </Typography>
        <Typography variant="body1" color="text.primary">
          Travel to many parts of the world may involve the risk of a variety of
          hazards to health and/or safety, including but not limited to disease,
          crime, terrorism, and warfare. Romingo is not in a position to advise
          or recommend whether travel to any particular place at any particular
          time should take place and the display or availability to book
          accommodations in a destination is not a representation or warranty by
          Romingo that travel to the destination is without risk. It is
          recommended that you refer to objective third-party sources of travel
          information, such as that maintained by the U.S. Department of State
          (travel.state.gov). In addition, you should consult with government
          websites to ensure that you are in compliance with all requirements
          for admittance into that country as well as understanding local laws
          that govern travel within a country, such as COVID-19 requirements.
          Should you choose to travel to a country that has been issued a travel
          warning or advisory, Romingo will not be liable for damages or losses
          that result from travel to such destinations. It is your sole
          responsibility to secure and/or pay for any and all visas, reciprocity
          fees, affidavits, immunizations, etc. that are required to be
          permitted entry into each destination. Please note that entry to any
          country may be refused even if the required information and travel
          documents are complete. Obtaining and carrying these documents is your
          sole responsibility. Romingo bears no responsibility for such
          information or for any delays, damages, and/or losses including missed
          portions of your travel related to improper documentation or
          government decisions about entry.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          COVID-19 WAIVER
        </Typography>
        <Typography variant="body1" color="text.primary">
          By booking a hotel at this time, you acknowledge the highly contagious
          nature of COVID-19 and voluntarily assume the risk for yourself, that
          you may be exposed to or infected by COVID-19 by traveling and/or
          staying at any accommodation and that such exposure or infection may
          result in personal injury, illness, permanent disability, and death
          even if such injuries or losses occur in a manner that is not
          foreseeable at the time you book your trip. You acknowledge that
          exposure to such viruses or disease is an inherent risk of traveling,
          that cannot be controlled or eliminated by Romingo. You acknowledge
          that due to the uncertainty of travel at this time, your travel may be
          postponed or the travel and/or accommodation may be cancelled, or
          changes may be made to reservations due to decisions by Accommodations
          Suppliers or governments, for which there may be no refund. All
          Accommodation Suppliers and destinations have their own rules related
          to COVID-19. For example, you may be required to quarantine upon
          arrival in some locations. Some locations may require masks or social
          distancing, they may require you to provide proof of vaccination or
          negative testing. Stopover countries requirements during any travel
          will also apply. On your return home, additional testing,
          requirements, or documentation may be required. You are responsible
          for researching, learning, and understanding these requirements and
          must not rely on any representations made by Romingo. Should you be
          denied entry to any destination, we shall not be responsible for any
          such denial, or any cost associated therewith. You understand that you
          may become sick before, during, or after the trip and may not be able
          to travel and such cancellation or interruption will be subject to the
          Accommodation Suppliers’ cancellation terms, for which we will not be
          liable. You agree that due to uncertainty caused by COVID 19, Romingo
          has strongly encouraged the purchase of travel protection coverage
          including cancel for any reason coverage if and when available, and
          that should you fail to purchase travel protection coverage, Romingo
          shall not be liable to any losses howsoever arising. Romingo shall not
          be liable should travel protection exclude Covid-19 related losses.
          You, for yourself, and on behalf of your heirs, assigns, personal
          representatives and next of kin (The Releasors), HEREBY RELEASE, AND
          HOLD HARMLESS JZ Partners LLC d/b/a Romingo, its members, officers,
          agents, and/or employees, assigns, and suppliers (RELEASEES), of,
          from, and against any and all claims, damages, demands, losses, and
          liability arising out of or related in any way, in whole or in part to
          any POSTPONEMENT, CANCELLATION, CHANGES, INJURY, DISABILITY, DEATH, OR
          ANY OTHER LOSS you may suffer due to exposure, infection, spread,
          closure, and travel restrictions related to COVID- 19, WHETHER ARISING
          FROM THE NEGLIGENCE OF THE RELEASEES OR OTHERWISE, to the fullest
          extent permitted by law. The terms of this HOLD HARMLESS AND RELEASE
          OF ALL LIABILITY paragraph, shall survive any termination or
          cancellation of this Contract, whether by operation of law or
          otherwise.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Disclaimer of Liability
        </Typography>
        <Typography variant="body1" color="text.primary">
          The information and offers contained on the Site (including text,
          graphics, links, or other material) are provided on an &quot;as
          is&quot;, and &quot;where available&quot; basis. Romingo makes no
          representation or warranty, express or implied, to you or another
          person or entity as to the accuracy, results, timeliness,
          completeness, merchantability, fitness for any particular purpose,
          including but not limited to warranties arising by statute or
          otherwise in law or from a course of dealing or usage of trade, with
          respect to the site or any related materials, products, services, or
          information. Under no circumstances, including, but not limited to
          negligence, shall we, our providers or distributors, be liable for any
          damages to, or viruses that may infect your computer equipment or
          other property, or any loss of data, on account of your access to, use
          of, or browsing on the site, or your downloading of any materials,
          data, text, images, video, audio, or other information from the site
          or associated with any email or links sent to you by Romingo. In no
          event shall we, our providers or distributors, be liable for any
          injury, loss, claim, damage, or any special, punitive, exemplary,
          direct, indirect, incidental, or consequential damages of any kind
          (including, but not limited to, lost profits , lost business, or lost
          savings), whether based in contract, tort, strict liability, or
          otherwise, that arise out of or are in any way connected with the use,
          or the inability to use, the site or the services or materials on the
          site or the travel reservations booked through Romingo (whether
          through this site or call center), even if advised of the possibility
          of such damages. In no event shall our aggregate liability, or that of
          our providers or distributors, exceed the total charges set forth in
          the itinerary giving rise to any such liability. Any claim or cause of
          action arising from, or relating to, your access and use of, or
          purchase of products and/or services from, the site must be brought
          within one year from the date on which such claim or action arose or
          accrued or purchase was completed. Applicable law may not allow the
          limitation or exclusion of liability of incidental or consequential
          damages, so the above limitation or exclusion may not apply to you.
          Your use of the site shall be at your own risk. The Accommodation
          Suppliers providing Accommodations on this Website are independent
          contractors and not agents or employees of the Romingo. Romingo is not
          liable for the acts, errors, omissions, representations, warranties,
          breaches, or negligence of any such Accommodation Suppliers or for any
          personal injuries, death, property damage, or other damages or
          expenses resulting there from.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Indemnification
        </Typography>
        <Typography variant="body1" color="text.primary">
          You agree to defend and indemnify JZ Partners LLC d/b/a Romingo, its
          members, officers, agents, and/or employees, assigns from and against
          any claims, causes of action, demands, recoveries, losses, damages,
          fines, penalties or other costs or expenses of any kind or nature
          including but not limited to reasonable legal and accounting fees,
          brought by third parties as a result of:
          <ul>
            <li>
              your breach of these Terms or the documents referenced herein;
            </li>
            <li>any damage caused by you at the Accommodation;</li>
            <li>
              your violation of any law or the rights of a third party; or
            </li>
            <li>your use of our Site.</li>
          </ul>
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Links to Third Party Sites
        </Typography>
        <Typography variant="body1" color="text.primary">
          Our website contains links to websites owned and operated by third
          parties. If you use these links, you leave our website. These links
          are provided for your information and convenience only and are not an
          endorsement by Romingo of the content of such linked websites or
          third-party services. Romingo has no control of the content of any
          linked website and is not responsible for these websites or their
          content or availability. Romingo makes no warranties or
          representations, express or implied about such linked websites, the
          third parties they are owned and operated by, the information
          contained on them, or the suitability of quality of their products or
          services. If you decide to access any third-party websites and make
          use of the information contained on them and/or enter any contract for
          the supply of goods or services from such third party and/or make any
          donations to such third party, you do so entirely at your own risk.
          Romingo accepts no liability for damage or loss, however caused in the
          connection with the use of or reliance on any information, material,
          products, or services contained on or accessed through any such linked
          website.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Intellectual Property
        </Typography>
        <Typography variant="body1" color="text.primary">
          We, along with our corporate affiliates, the Accommodation Suppliers,
          Third Party Suppliers, and other licensors, own all of the text,
          images, software, trademarks, service marks and other material
          contained on the Site. By using the Site, you hereby agree that you
          will not copy or transmit any of the material except if you are doing
          so for your personal, non-commercial use. All copyright, trademark and
          other proprietary rights notices presented on the Site must appear on
          all copies you print. Other non Romingo product, service, or company
          designations on the Site belong to those respective third parties and
          may be mentioned on the Site for identification purposes only. You
          should contact the appropriate third party for more complete
          information regarding such designations and their registration status.
          Your use of and access to the Site does not grant you any license or
          right to use any of the marks included on the Site.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Content on the Site
        </Typography>
        <Typography variant="body1" color="text.primary">
          The “Content” on the Site is the copyrighted work of Romingo and/or
          our respective suppliers. “Content” includes, but is not limited to,
          all materials, information, text, graphics, images, logos,
          photographs, illustrations, audio clips, video clips, and audio-visual
          material available on the Site. You may not modify, publish, copy,
          transmit, transfer, sell, reproduce, create derivative works from,
          license, distribute, frame, hyperlink, download, repost, perform,
          display or in any way commercially exploit any of the content;
          provided, however, you may download one copy of the content for your
          personal, non- commercial use only, provided that you keep intact all
          copyright and other proprietary notices.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Prohibited Uses
        </Typography>
        <Typography variant="body1" color="text.primary">
          The content and information on the Site (including, but not limited
          to, price and availability of travel services) as well as the
          infrastructure used to provide such content and information, is
          proprietary to us or our suppliers and providers. While you may make
          limited copies of your travel itinerary (and related documents) for
          travel or reservations booked through the Site, you agree not to do
          any of the following without our express permission:
          <ul>
            <li>
              modify, copy, distribute, transmit, display, perform, reproduce,
              publish, license, create derivative works from, reverse engineer,
              transfer, or sell or re-sell any information, software, products,
              or services obtained from or through our Website;
            </li>
            <li>
              use this Website or its contents for any commercial purpose;
            </li>
            <li>make any speculative, false, or fraudulent booking;</li>
            <li>
              access Our Website with any manual or automated process for any
              purpose other than your personal use or for inclusion of Romingo
              pages in a search index. Use of any automated system or software
              to extract data from Our Website (“screen scraping”), for
              commercial or non- commercial purposes, is prohibited;
            </li>
            <li>
              violate the restrictions in any robot exclusion headers on this
              Website or bypass or circumvent other measures employed to prevent
              or limit access to Our Website;
            </li>
            <li>
              take any action that imposes, or may impose, in our discretion, an
              unreasonable or disproportionately large load on our
              infrastructure;
            </li>
            <li>
              deep link to any portion of Our Website (including, without
              limitation, the purchase path for any travel services) for any
              purpose;
            </li>
            <li>
              use any device, software or routine that interferes or attempts to
              interfere with the normal operation of Our Website or take any
              action that imposes an unreasonable load on our computer or
              network equipment;
            </li>
            <li>
              &quot;frame&quot;, &quot;mirror&quot; or otherwise incorporate any
              part of this Website into any other website without our prior
              written authorization;
            </li>
            <li>
              post or distribute any material on Our Website that violates the
              rights of any third party or applicable law;
            </li>
            <li>
              use Our Website to collect or store personal data about others
              whether through data mining or any other means;
            </li>
            <li>
              use any feature of Our Website for any purpose that is unlawful,
              harmful, or otherwise objectionable or inappropriate, as
              determined by us; and
            </li>
            <li>
              use any data mining methods whatsoever and for any purposes
              whatever.
            </li>
          </ul>
          If your booking or membership account shows signs of fraud, abuse, or
          suspicious activity, Romingo, in our sole and absolute discretion, may
          cancel any bookings associated with your name, email address, or
          account, and close any associated Romingo accounts. If you have
          conducted any fraudulent activity, Romingo reserves the right to take
          any necessary legal action and you may be liable for monetary losses
          to Romingo, including litigation costs and damages. To contest the
          cancellation of a booking or freezing or closure of an account, or
          cancellation of an order please contact Romingo Customer Service.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Review Comments Photos and Other Submissions
        </Typography>
        <Typography variant="body1" color="text.primary">
          The Site contains reviews in which you can post content. If you use
          said interactive areas on the Site you are solely responsible for the
          travel information and other content, including without limitation,
          any reviews, text, images, links, or videos that you upload, transmit,
          or share with us or others on or through the website (collectively,
          the &quot;User Content&quot;), and you represent and warrant that you
          are not transmitting or sharing User Content that you do not have
          permission to share. We do not guarantee any confidentiality with
          respect to the User Content, and you understand that the User Content
          may be publicly displayed. When you provide us with User Content, you
          own the content you create and share, and you also grant us a
          perpetual, transferable, irrevocable, sub-licensable, fully paid,
          worldwide license to use, modify, reproduce, distribute, prepare
          derivative works of, publicly perform, and publicly display (in
          tangible form and electronically) all User Content or other content
          provided to us. We can use the User Content in any format, channel,
          platform, or region with the right to localize the content into other
          languages. If uploaded or submitted to us, you further give us
          permission and the right to use your name, image, likeness, or other
          personal attributes for the purposes described in these Terms. You
          authorize us to make copies as we deem necessary in order to
          facilitate the storage and assimilation of the User Content on the
          websites. By providing us User Content, you represent and warrant that
          the User Content you provide will not violate or in any way infringe
          upon the rights of third parties, including property, contractual,
          employment, trade secrets, proprietary information, and nondisclosure
          rights, or any intellectual property rights. You may remove your User
          Content from the website, but the license that you have granted will
          remain in effect. You understand that we do not control nor are we
          responsible for reviewing User Content. However, we reserve the right
          to review, edit, or delete any User Content or your account at any
          time. We are not in any way responsible or liable for such User
          Content or the messaging contained in User Content. You must not
          create and/or upload any User Content that:
          <ul>
            <li>is advertising placed as a review, or a survey;</li>
            <li>is intentionally untrue;</li>
            <li>is immoral, pornographic or in any other way offensive;</li>
            <li>
              violates applicable laws in any way or constitutes a criminal
              offence; or
            </li>
            <li>
              contains viruses or other computer programs that may damage
              software or hardware or that may affect the use of computers.
            </li>
          </ul>
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Account Termination
        </Typography>
        <Typography variant="body1" color="text.primary">
          We reserve the right, in our sole discretion, and without liability,
          to terminate your access to all or part of the Site, with or without
          notice, for any reason or no reason.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Privacy
        </Typography>
        <Typography variant="body1" color="text.primary">
          Your privacy is important to us. Please{" "}
          <Link href="/privacy">click here</Link> to review our privacy policy.
          Your personal information will be used in accordance with our privacy
          policy, so we encourage you to review it.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Reporting Claims of Copyright Infringement
        </Typography>
        <Typography variant="body1" color="text.primary">
          If you believe that materials hosted by us infringe your copyright,
          please submit (or have your agent submit) to us a notice including all
          of the information requested below. If you fail to provide all of the
          requested information, we will not process your notice. You may wish
          to seek legal counsel prior to submitting a copyright infringement
          notice. You could be held liable for alleging false claims of
          copyright infringement.
          <ul>
            <li>
              {" "}
              A physical signature of the person authorized to act on behalf of
              the owner of the copyrighted work;{" "}
            </li>
            <li>
              A description of the copyrighted work that you claim has been
              infringed upon;
            </li>
            <li>
              A description of where the material that you claim is infringing
              is located on the Site;
            </li>
            <li>Your address, telephone number, and e-mail address;</li>
            <li>
              A statement by you that you have a good-faith belief that the
              disputed use is not authorized by the copyright owner, its agent,
              or the law;
            </li>
            <li>
              A statement by you, made under penalty of perjury, that the above
              information in your notice is accurate and that you are the
              copyright owner or authorized to act on the copyright owner&apos;s
              behalf.
            </li>
          </ul>
          Our Copyright Agent for notice of claims of copyright infringement on
          the site can be reached as follows:
          <Typography variant="body1" sx={{ my: 2, fontWeight: "bold" }}>
            support@romingo.com
          </Typography>{" "}
          We reserve the right in appropriate circumstances to remove content on
          the Site alleged to be infringing without prior notice, and/or to
          terminate the accounts of users who infringe any intellectual property
          rights of others.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Complaints
        </Typography>
        <Typography variant="body1" color="text.primary">
          We understand that sometimes issues may arise. If you have complaints,
          we encourage you to contact us at (provide a phone of email), so that
          we can work with you to attempt to resolve the problem. If you have an
          issue with the accommodation, your complaint should be addressed to
          the Accommodation Supplier.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Dispute Resolution/Arbitration
        </Typography>
        <Typography variant="body1" color="text.primary">
          Any dispute, controversy or claim arising out of or relating in any
          way to the Site, your use of the Site, your use of services booked
          through the Site, or these terms including without limitation any
          dispute concerning the construction, validity, interpretation,
          enforceability or breach of the terms, shall be exclusively resolved
          by binding arbitration administered by the American Arbitration
          Association under its Commercial Arbitration Rules except that you and
          we may assert Claims on an individual basis in small claims court if
          they qualify. The number of arbitrators shall be three. The place of
          arbitration shall be California. California law shall apply. Judgment
          on the award rendered by the arbitrator(s) may be entered in any court
          having jurisdiction thereof. The demand for arbitration shall be made
          within a reasonable time after the claim, dispute or other matter in
          question has arisen, and in no event shall it be made after one year
          from when the aggrieved party knew or should have known of the
          controversy, claim, dispute, or breach. It is the intent of the
          parties that, barring extraordinary circumstances, arbitration
          proceedings will be concluded within one hundred and twenty days from
          the date the arbitrators are appointed. The arbitrators may extend
          this time limit in the interests of justice. Failure to adhere to this
          time limit shall not constitute a basis for challenging the award. The
          Parties shall not be entitled to discovery in the arbitration except
          that any Party shall be entitled to request no more than 500 pages of
          documents and to take two depositions not to exceed eight hours for
          each such deposition. Any Party shall be entitled to depose any expert
          who will testify in the arbitration proceeding but shall pay the
          regular hourly rate of such expert during such deposition. The Parties
          shall exchange a copy of all exhibits for the arbitration hearing and
          shall identify each witness who will testify at the arbitration, with
          a summary of the anticipated testimony of such witness ten days before
          the arbitration hearing. The arbitrators shall have no authority to
          award punitive/consequential/special/indirect damages. The arbitrators
          shall be entitled to issue injunctive and other equitable relief. The
          cost of the arbitration proceeding and any proceeding in court to
          confirm or to vacate any arbitration award, as applicable (including,
          without limitation, reasonable attorneys’ fees, and costs), shall be
          borne by the unsuccessful party, as determined by the arbitrators, and
          shall be awarded as part of the arbitrator’s award. It is specifically
          understood and agreed that any party may enforce any award rendered
          pursuant to the arbitration provisions of this Section by bringing
          suit in any court of competent jurisdiction. This Section shall
          survive the termination or cancellation of this Agreement.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Governing Law
        </Typography>
        <Typography variant="body1" color="text.primary">
          These Terms shall be governed by and construed under the laws of the
          State of California (without regard to conflict of laws principles),
          all rights and remedies being governed by said laws. The Parties
          hereby submit to the exclusive jurisdiction for the purpose of
          enforcing any arbitration or small claims matters, of state and
          federal courts located in California.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Attorney’s Fees
        </Typography>
        <Typography variant="body1" color="text.primary">
          In any action or proceeding brought regarding any controversy or claim
          arising out of or relating in any way to the Site, your use of the
          Site, your use of services booked through the Site, or these terms
          including without limitation any dispute concerning the construction,
          validity, interpretation, enforceability or breach of the terms, the
          successful party shall, to the extent permitted by applicable law, be
          entitled to recover reasonable attorneys’ fees in addition to any
          other available remedy.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Validity
        </Typography>
        <Typography variant="body1" color="text.primary">
          If any provision of the Terms or the application of any provision
          hereof to any person or circumstances is held invalid, unenforceable,
          or otherwise illegal, the remainder of the Terms and the application
          of such provision to any other person or circumstances will not be
          affected, and the provision so held to be invalid, unenforceable, or
          otherwise illegal will be reformed to the extent (and only to the
          extent) necessary to make it enforceable, valid, or legal.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          No Wavier
        </Typography>
        <Typography variant="body1" color="text.primary">
          No failure by either party hereto at any time to give notice of any
          breach by the other party of, or to require compliance with, any
          condition or provision of the Terms shall be deemed a waiver of
          similar or dissimilar provisions or conditions at the same or at any
          prior or subsequent time.
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          General
        </Typography>
        <Typography variant="body1" color="text.primary">
          Nothing contained in these Terms will be deemed to constitute either
          party as the agent or representative of the other party, or both
          parties as joint venturers or partners for any purpose. You may not
          assign, delegate, or transfer your rights or obligations under these
          Terms. We may assign our rights and duties under these Terms without
          such assignment being considered a change to the Terms and without
          notice to you, provided your rights under these Terms are not
          prejudiced.
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default About;
