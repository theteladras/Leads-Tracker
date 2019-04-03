INSTALACIJA:

\$ git clone 'url projekta'.

\$ cd 'leads'

\$ npm i

\$ cd 'leads-app'

\$ npm i

Za pokretanje aplikacije:

1. ~/leads \$ npm run dev
   (s tim da je neophodno uraditi: ~/leads \$ npm i concurrently)
   ili

2. ~/leads \$ node index.js "i iz drugog prozora" ~/leads/leads-app \$ npm start

Hijerarhija upravljanja aplikacijom:

ADMIN - svaki registrovani korisnik je admin svoje list, sto znaci da svoju listu moze da uredjuje u potpunosti.
MANAGER - manager je registrovani korisnik koji je dobio ovlascenje da uredjuje partnersku listu.
USER - user je svaki registrovani korisnik koji gleda partnersku listu, odnosno nema mogucnost da menja tu listu.

// sve je to omoguceno iskljucivo registracijom svakog korisnika.

REGISTRACIJA:

Za registraciju su potrebna tri parametra: username, company, email.

LOGOVANJE:

Uz pomoc registrovane email adrese.
