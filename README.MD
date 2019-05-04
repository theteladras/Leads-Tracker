###INSTALACIJA:

markup : `\$ git clone https://github.com/theteladras/Leads-Tracker.git`

markup : `\$ cd Leads-Tracker/`

markup : `\$ npm i`

markup : `\$ cd leads-app/`

markup : `\$ npm i`

markup : `\$ cd ..`

Za pokretanje aplikacije:

1. ~/leads \$ npm run dev
   (s tim da je neophodno uraditi: ~/leads \$ npm i -g concurrently)
   ili

2. ~/leads \$ node index.js "i iz drugog prozora" ~/leads/leads-app \$ npm start

###Hijerarhija upravljanja aplikacijom:

Markup : * ADMIN - svaki registrovani korisnik je admin svoje list, sto znaci da svoju listu moze da uredjuje u potpunosti.
Markup : * MANAGER - manager je registrovani korisnik koji je dobio ovlascenje da uredjuje partnersku listu. I njega postavlja vlasnik svoje liste (ADMIN).
Markup : * USER - user je svaki registrovani korisnik koji gleda partnersku listu, odnosno nema mogucnost da menja tu listu.

PARTNER - sve kompanije koje pomenu / navedu na svojoj listi nekog usera.

// sve je to omoguceno iskljucivo registracijom svakog korisnika.

###REGISTRACIJA:

Za registraciju su potrebna tri parametra: username, company, email.

###LOGOVANJE:

Uz pomoc registrovane email adrese.

SAMPLE ACCOUNTS:

admin@admin.com

test@test.com

###FICHERI

Markup : * Autentikacija ( error handling, success handling, navigating... )
Markup : * Dodavanje lead-a (unosom parametara ili za user ili company lead).
Markup : * Editovanje svakog lead-a.
Markup : * Brisanje leadova.
Markup : * Promocija u menager-a.
Markup : * Sortiranje leadov-a po alphabetu imena ili po datumu postavljanja.
Markup : * Promena kategorije svakog lead-a.
Markup : * Logoutovanje...
Markup : * Partner view.
...
