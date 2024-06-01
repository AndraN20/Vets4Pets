# Vets4Petss
Appointment management app for a veterinary clinic made with Angular and Java Spring Boot


Functionalitati implementate: Vizualizarea programarilor in pagini de cate 5 elemente, sortata initial dupa data in ordine invers cronologica, avand posibilitatea de filtrare dupa una sau mai multe coloane; La vizualizarea unei programari putem adauga diagnostic, doar in cazul in care programarea este confirmata, iar daca nu este confirmata avem si un buton de confirmare; Am pus ca programarea sa devina incheiata atunci cand este completat diagnosticul. (in spate este un edit) Statusul programarilor se poate vedea si in lista, fiind colorate specific;

Adaugarea programarilor functioneaza, aici putem salva si servicii medicale noi pe care sa le adaugam la programarea noua, iar statusul programarii va fi setat automat pe creata;

Editarea programarilor functioneaza dupa toate proprietatile sale.

Apoi a intervenit problema cautarilor. Dupa ce filtrele functionau, trebuiau sa existe si dupa repornirea aplicatiei. Pana la acest task, foloseam o baza de date care se reseta la fiecare pornire a aplicatiei, iar apoi m-am gandit daca sa folosesc o baza de date in care datele persista si intre pornirile aplicatiei, dar am decis sa o folosesc la fel ca pana atunci, iar cautarile sa fie salvate in local storage. (nu stiu daca asta era cea mai buna solutie, dar pana la cerintele de avansat parea cea mai ok)

Cerintele de avansat vor urma sa fie implementate pe viitor :)
