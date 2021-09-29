const getTextItem = (textType, padding, text) => {
  let textFontSize = '14px';

  if (textType === 'title') textFontSize = '20px';
  if (textType === 'subTitle') textFontSize = '18px';

  return {
    fontSize: textFontSize,
    text,
    padding: `${padding}px`
  }
}

export const termsAndConditions = [
  getTextItem('description', 0,'By using this website www.penguinfinance.org and any of its pages (hereafter the “Site”), registering for a “User Account” or using any of our services (“Penguin Finance Services ”, the “Services”), “you” as a “user” (“you”, “your”, “yourself”, or “user”) confirm and declare that you have read, reviewed, understood and accepted all of the following important legal information and present terms and conditions of use (“Terms of Use”, the “Terms”) mentioned hereinafter and will comply to them, as well as all policies and procedures incorporated by reference. If you do not agree to the Terms of Use or any policies and procedures incorporated by reference, please exit the Site immediately.'),
  getTextItem('description', 0,'The Terms are subject to change at any time without notice and access to and use of the Site may be restricted or terminated at any time. You are therefore advised to review these terms each time you access this website or any of our services and products.'),
  getTextItem('description', 0,'As used in this Terms, “Penguin Finance Services” refers to the Penguin Finance Community may also refer to the services, products, website, content, other materials, coins, trademarks and any other asset of Penguin Finance.'),
  // Applicable Law and Jurisdiction
  getTextItem('title', 0,'Applicable Law and Jurisdiction'),
  getTextItem('description', 0,'Access to and use of the Site as well as the Terms are governed and construed in accordance with Swiss Law. The parties agree to irrevocably submit to the exclusive jurisdiction of the Switzerland Courts, unless as part of a dispute resolution, they agree in writing otherwise.'),
  getTextItem('description', 0,'Depending on your country of residence, you may not be able to use all the functions of the Site. We are required by law to block transactions involving residents of the US. '),
  getTextItem('description', 0,'The User understands that it is obliged to comply with its country´s Law and Regulations, as well as the conditions and limitations of this contract and any other binding document related to Penguin Finance.'),
  getTextItem('description', 0,'Penguin Finance complies with all applicable law, working on an anonymity model, reserving the power to enforce, block, void or exclude any member that is in infringement of these conditions or any law or regulation.'),
  // No offer, no advice
  getTextItem('title', 0,'No offer, no advice'),
  getTextItem('description', 0,'The information, products, data, services, tools and documents contained or described on this site (the “Content”) are for information purposes only and constitute neither an advertisement or recommendation nor an offer or solicitation to buy or sell virtual currencies, to affect any transaction or to enter into any legal relations. Penguin Finance is not an advisory firm, and its information is product of individuals in the community who may or may not be experts in the subject, and Penguin Finance cannot and will not, guarantee its accuracy.'),
  getTextItem('description', 0,'Prior to making investment decisions users must make sure to understand the services and products, and conduct a thorough investigation and obtain all necessary professional advice for all issues, including your eligibility to make such investment in terms of the applicable law.'),
  getTextItem('description', 0,'Nothing on this site and any of the Penguin Finance Publications constitutes investment, legal, accounting or tax advice, or a representation that any investment or strategy is suitable or appropriate for individual circumstances, or otherwise constitutes a personal recommendation for any specific investor. Penguin Finance urges all users to independently research with a professional advisor, the legal, financial, regulatory, credit, tax and accounting risks involved with any transactions.'),
  // Implied Risks
  getTextItem('title', 0, 'Implied Risks'),
  getTextItem('subTitle', 0, '1. Representations and Warranties of User.'),
    getTextItem('description', 16, 'In connection with the issuance and distribution of Tokens /and Crypto Coins, User hereby represents and warrants to Penguin Finance that on the date of this Agreement and on an ongoing basis:'),
    getTextItem('description', 16, '(a) User is aware that an investment in the Tokens and Crypto Coins involves a significant degree of risk. User acknowledges that no representations or warranties have been made to it or to its advisors or representatives with respect to the business or prospects of Penguin Finance or its financial condition;'),
    getTextItem('description', 16, '(b) User has all requisite power and authority to execute and deliver this Agreement, to purchase the Purchased Tokens and Crypto Coins, and to carry out and perform its obligations under this Agreement;'),
    getTextItem('description', 16, '(c) If an individual, User is at least eighteen (18) years old and of sufficient legal age and capacity to enter into this Agreement. If a legal entity, User is duly organized, validly existing and in good standing under the Laws of its domiciliary jurisdiction and each jurisdiction where it conducts business;'),
    getTextItem('description', 16, '(d) The execution, delivery and performance of this Agreement will not result in:'),
    
      getTextItem('description', 32, '(i) any violation of, be in conflict with or constitute a material default under, with or without the passage of time or the giving of notice of:'),
        getTextItem('description', 48, '(A) any provision of User’s organizational documents, if applicable;'),
        getTextItem('description', 48, '(B) any provision of any judgment, decree or order to which User is a party, by which it is bound, or to which any of its assets are subject;'),
        getTextItem('description', 48, '(C) any agreement, obligation, duty or commitment to which User is a party or by which it is bound; or'),
        getTextItem('description', 48, '(D) any Laws; or'),
      getTextItem('description', 32, '(ii) the creation of any lien, charge or encumbrance upon any assets of User;'),
    
    getTextItem('description', 16, '(e) the execution and delivery of, and performance under, this Agreement require no approval or other action from any Governmental Authority or person or entity other than the Founders, except for such consents, approvals, authorizations, orders, filings, registrations or qualifications as:'),
      getTextItem('description', 32, '(i) have already been obtained or made and are still in full force and effect; and'),
      getTextItem('description', 32, '(ii) may be required under applicable state securities Laws in connection with the purchase, distribution and redistribution of Tokens and Crypto Coins;'),

    getTextItem('description', 16, '(f) User has sufficient knowledge and experience in business, technology, financial, securities, and securities investments matters, including a sufficient understanding of blockchain or cryptographic Tokens and Crypto Coins and other digital assets, smart contracts, storage mechanisms (such as digital or token wallets), blockchain-based software systems and blockchain technology, to be able to evaluate the risks and merits of User’s purchase of Tokens and Crypto Coins using a digital wallet, including but not limited to the matters set forth in this Agreement, and is able to bear the risks thereof, including loss of all amounts paid, loss of Tokens and Crypto Coins and liability to Penguin Finance and others for its acts and omissions, including without limitation those constituting a breach of this Agreement, negligence, fraud or willful misconduct;'),
    getTextItem('description', 16, '(g) User’s financial situation is such that User can afford to bear the economic risk of holding Tokens and Crypto Coins for an indefinite period of time, and User can afford to suffer the complete loss of the Purchase Price and Tokens and Crypto Coins;'),
    getTextItem('description', 16, '(h) User has obtained sufficient information in order to make an informed decision to purchase Tokens and Crypto Coins. User is not relying on Penguin Finance or any of its owners, directors, officers, counsel, employees, agents or representatives for legal, investment or tax advice. User represents that to the extent that User has any questions with respect to the purchase of Tokens and Crypto Coins, User has sought professional advice. User has sought independent legal, investment and tax advice to the extent that User has deemed necessary or appropriate in connection with User’s decision to purchase Tokens and Crypto Coins described herein;'),
    getTextItem('description', 16, '(i) User has considered and accepts the risks associated with the purchase of cryptocurrencies such as the Token and the use of public blockchains, including (without limitation) the following risks:'),
      getTextItem('description', 32, '(i) that there may be no prior market for Tokens or Crypto Coins and their Distribution may not  result in an active or liquid market for the Tokens or Crypto Coins;'),
      getTextItem('description', 32, '(ii) future sales or issuance of the Tokens or Crypto Coins could materially and adversely affect the market price of Tokens and Crypto Coins;'),
      getTextItem('description', 32, '(iii) negative publicity that adversely affects the price of the Tokens and Crypto Coins;'),
      getTextItem('description', 32,'(iv) defects in each platform and in the Token or Crypto Coin;'),
      getTextItem('description', 32,'(v) the market price of the Tokens and Crypto Coins fluctuating following the Sale;'),
      getTextItem('description', 32, '(vi) the private keys to the User’s wallet being:'),
        getTextItem('description', 48,'(A) lost, resulting in permanent and irretrievable loss of funds; or'),
        getTextItem('description', 48,'(B) compromised resulting in the misappropriation of the User’s Tokens and Crypto Coins by malicious third parties;'),
      getTextItem('description', 32, '(vii) the loss of users, validators and nodes to an extent that results in failure of the platform and specific Token or Crypto Coin to operate as intended  by the Penguin Finance;'),
      getTextItem('description', 32, '(viii) a third party issuing digital assets similar or identical to the Token or Crypto Coin, resulting in a loss of users, validators or nodes or drop in price of the Token or Crypto Coin;'),
      getTextItem('description', 32, '(ix) errors in the wallet address supplied to the Penguin Finance, resulting in permanent and irretrievable loss of funds;'),
      getTextItem('description', 32, '(x) the creation of a hard fork in the blockchain which renders the Tokens and Crypto Coins invalid or otherwise unable to function in accordance with their intended design and purpose.'),
    getTextItem('description', 16,'(j) User, in making the decision to purchase the Tokens and Crypto Coins, has relied upon an independent investigation of Penguin Finance and has not relied upon any information or representations made by any third parties or upon any oral or written representations or assurances from the Penguin Finance Community, its owners, members, directors, officers, employees, agents, or any other representatives of the Penguin Finance, other than as expressly set forth in this Agreement;'),
    getTextItem('description', 16,'(k) User has verified the accuracy of their wallet address and other details before executing the transaction; and'),
    getTextItem('description', 16,'(l) User acknowledges that User shall be solely responsible for inputting and transmitting all required documentation correctly and accurately.'),

  getTextItem('subTitle', 0, '2. Sanctions Compliance, Anti-Money Laundering, Funds and Payments.'),
    getTextItem('description', 16, 'In addition to the other representations and warranties made by the User as set out in this Agreement, Penguin Finance have also relied on a number of representations, and warranties made by the User on the date of this Agreement and on an ongoing basis as set out in this Section “Representations and Warranties of User”. These are as follows:'),
    getTextItem('description', 16, '5.1 Sanctions Compliance.'),
    getTextItem('description', 16, 'The User declares, prior to receipt of Tokens and Crypto Coins, that they are not:'),
      getTextItem('description', 32, '(a) the subject of sanctions administered or enforced by the United States (including without limitation the U.S. Department of the Treasury’s Office of Foreign Asset Control), the United Kingdom, the European Union, Australia or any other Governmental Authority (collectively, “Sanctions”);'),
      getTextItem('description', 32, '(b) organized or resident in a country or territory that is the subject of country-wide or territory-wide Sanctions; or'),
      getTextItem('description', 32, '(c) otherwise a party with which Penguin Finance are prohibited from dealing with under applicable Laws,'),
    getTextItem('description', 16, 'with such declarations to be retained by User for inspection by Penguin Finance on reasonable request.'),

    getTextItem('description', 16, '5.2 Anti-money Laundering; Counter-Terrorism Financing.'),
    getTextItem('description', 16, 'To the extent required by applicable Laws, to the best of their knowledge, User has complied and will continue to comply with all anti-money laundering and counter-terrorism financing requirements.'),

    getTextItem('description', 16, '5.3 Funds and Payments.'),
      getTextItem('description', 32, '(a) The funds, including any fiat, virtual currency or cryptocurrency, User uses to purchase Tokens and Crypto Coins are not derived from or related to any unlawful activities, including but not limited to money laundering or terrorist financing, and User will not use, or permit the use of, Tokens and Crypto Coins to finance, engage in or otherwise support any unlawful activities.'),
      getTextItem('description', 32, '(b) All payments by or on behalf of User under this Agreement will be made only in User’s name, from a digital wallet or bank account not located in a country or territory that has been designated as a “non-cooperative country or territory” by the Financial Action Task Force.'),

    getTextItem('description', 16, '5.4 Local Laws.'),
      getTextItem('description', 32, '(a) User has satisfied itself as to the full observance of the Laws of User’s jurisdiction in connection with any invitation to subscribe for the Tokens and Crypto Coins or any use of this Agreement, including:'),
        getTextItem('description', 48, '(i) the legal requirements within User’s jurisdiction for the purchase of the Tokens and Crypto Coins;'),
        getTextItem('description', 48, '(ii) any foreign exchange restrictions applicable to such purchase and the other transactions contemplated hereby; and'),
        getTextItem('description', 48, '(iii) any governmental or other consents that may need to be obtained; and'),
        getTextItem('description', 48, '(iv) the income tax and other tax consequences, if any, that may be relevant to the purchase, holding, redemption, sale, or transfer of the Tokens and Crypto Coins; and'),
      getTextItem('description', 32, '(b) User’s subscription and payment for and continued beneficial ownership of the Tokens and Crypto Coins will not violate any applicable securities or other Laws of User’s jurisdiction.'),
    
  getTextItem('description', 0, 'The market price of virtual currency changes in time, so that your virtual currency might have a much higher or lower value in the future. Good past performance is no guarantee of good future performance. The market of virtual currency is very volatile and prone to a quick change of prices. In fact, virtual currency can become even completely void of value. Virtual currencies are not supported by any entity. Neither Penguin Finance, nor any other entity or state is bound to buy back your virtual currencies in the future.'),
  getTextItem('description', 0, 'Please make sure you fully understand the implied risks and, therefore only undertake investments with which you are or have made yourself familiar and which are suitable in the light of your circumstances and financial resources.'),

  // Financial Regulation
  getTextItem('title', 0, 'Financial Regulation.'),
  getTextItem('description', 0, 'The Services provided are currently unregulated under Swiss  law, but this may be subject to change.'),
  
  // Local legal restrictions
  getTextItem('title', 0, 'Local legal restrictions'),
  getTextItem('description', 0, 'The Content is not intended for use by or distribution to any individual or legal entity in any jurisdiction or country where such distribution, publication or use would be contrary to the law or regulatory provisions or in which members of the Group of Companies controlled by Asset Tokenization Services (individually and together “Penguin Finance”) does not hold the necessary registration or license. Individuals or legal entities in respect of whom such prohibitions apply, whether on grounds of their nationality, their place of residence or on other grounds, are prohibited to access or use the site.'),
  getTextItem('description', 0, 'The entities, services and products of Penguin Finance may not be registered or licensed under legal and regulatory provisions governing financial services or products. Therefore, all users are requested to contact Penguin Finance Support for information about products and services available in their country, at the e-mail address: relations@penguinfinance.org'),
  
  // Privacy Policy
  getTextItem('title', 0, 'Privacy Policy'),
  getTextItem('description', 0, 'Penguin Finance works on an Full Anonymity Model, the only information ever recorded is the wallet address, which will be used to record you acceptance to this Contract, and thus, any violation will be executed using such wallet and any other information Penguin Finance may acquire in the future.'),

  // Termination of the Collaboration:
  getTextItem('title', 0, 'Termination of the Collaboration:'),
  getTextItem('description', 0, 'By acquiring our services, information, or product, you are accepting this contract. As long as you hold any of these items or as long as the information remains pertinent, this contract will be binding for the parties.'),

  // No liability
  getTextItem('title', 0, 'No liability'),
  getTextItem('description', 0, 'Given the community and decentralized nature of Penguin Finance, there are no directors, or representatives. Never the less to the Maximum extent permitted by current laws and/or regulations, Penguin Finance including its members, and its partners disclaim any and all liability for losses or damages (direct or indirect) of any kind whatsoever arising directly or indirectly as a result of the content, accuracy, completeness or otherwise of the content or any links or third party content, any errors in or omissions from the site, use of or access to the site, any inability to access or use the website for any reason, and any other situation related to the community.'),
  getTextItem('description', 0, 'To the full extent permitted by current laws and/or regulations; Penguin Finance shall not be liable for any loss of profits or revenue or savings or other economic loss, loss of business or goodwill, loss of or damage to data, incidental or special loss, wasted or lost management time, or indirect or consequential loss arising from use of or access to the site, even if advised of the possibility of any such loss or damage or if such loss or damage was foreseeable.'),
  getTextItem('description', 0, 'Penguin Finance cannot be held liable in any way if you send virtual currencies to an incorrect address or you send the wrong amount of virtual currencies. Also, the Penguin Finance Community, as well as the, cannot be held liable for the inaccuracies/ disagreements/ mistakes/ errors, which the User might commit.'),
  getTextItem('description', 0, 'None of the items mentioned above excludes or limits the liability of any of the parties for frauds, death, physical injuries, caused by negligence, the infringement of the clauses deriving from the law or by any other liability which cannot be limited or excluded by law.'),

  // Indemnity
  getTextItem('title', 0, 'Indemnity'),
  getTextItem('description', 0, 'To the full extent permitted by applicable law, you hereby agree to indemnify Penguin Finance, and its members against any action, liability, cost, claim, loss, damage, proceeding, or expense suffered or incurred if direct or not directly arising from your use of Penguin Finance Sites, your use of the Service, or from your violation of these Terms of Use.'),

  // Proprietary information
  getTextItem('title', 0, 'Proprietary information'),
  getTextItem('description', 0, 'The use, print and/or download a copy any materials from ant of the Penguin Finance websites and media accounts, is only permitted for personal, informative, non-advertising use, so long as the copyright and other legal provisions are kept intact.'),
  getTextItem('description', 0, 'Virtual currencies of trademarks, service marks, logos, as well as other similar items used on this website are associated with “Penguin Finance”, being owned by the latter and its members. The software, texts, images, data, prices, graphics, diagrams, and the audio materials and any other contact used on the Penguin Finances websites and social media accounts are the sole Intellectual Property of Penguin Finance.'),
  getTextItem('description', 0, 'It is strictly forbidden to use for any purposes, any materials existing on this website, on any other website or any other network of computers or social media account. Any such unauthorized use, which infringes the copyright, the Intellectual Property, or other laws, can be subjected to civil or criminal sanctions.'),

  // Miscellaneous
  getTextItem('title', 0, 'Miscellaneous.'),
  getTextItem('description', 0, 'If we are unable to perform the Services outlined in the Terms of Use due to factors beyond our control including but not limited to an event of Force Majeure, change of law or change in sanctions policy we will not have any liability to you with respect to the Services provided under this Agreement and for a time period coincident with the event.'),
]

export default termsAndConditions;