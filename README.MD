###INSTALACIJA:

`\$ git clone https://github.com/theteladras/Leads-Tracker.git`

`\$ cd Leads-Tracker/`

`\$ npm i`

`\$ cd leads-app/`

`\$ npm i`

`\$ cd ..`

Za pokretanje aplikacije:

1. ~/leads \$ npm run dev
   (s tim da je neophodno uraditi: ~/leads \$ npm i -g concurrently)
   ili

2. ~/leads \$ node index.js "i iz drugog prozora" ~/leads/leads-app \$ npm start

###Hijerarhija upravljanja aplikacijom:

* ADMIN - svaki registrovani korisnik je admin svoje list, sto znaci da svoju listu moze da uredjuje u potpunosti.
* MANAGER - manager je registrovani korisnik koji je dobio ovlascenje da uredjuje partnersku listu. I njega postavlja vlasnik svoje liste (ADMIN).
* USER - user je svaki registrovani korisnik koji gleda partnersku listu, odnosno nema mogucnost da menja tu listu.

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

* Autentikacija ( error handling, success handling, navigating... )
* Dodavanje lead-a (unosom parametara ili za user ili company lead).
* Editovanje svakog lead-a.
* Brisanje leadova.
* Promocija u menager-a.
* Sortiranje leadov-a po alphabetu imena ili po datumu postavljanja.
* Promena kategorije svakog lead-a.
* Logoutovanje...
* Partner view.
...
