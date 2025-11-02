# SoftGlam by M

# Prezentare fisiere JavaScript

Acest proiect foloseste mai multe fisiere JavaScript pentru a gestiona functionalitatea site-ului. Iata o prezentare detaliata:

---

## `app.js` – Pagina principala (`index.html`)

**Scop:**  
Incarca lista de servicii din API si le afiseaza sub forma de carduri pe pagina principala. Gestioneaza adaugarea produselor in cos si filtrarea serviciilor dupa cautare si categorie.

**Functii principale:**

- **`displayProducts()`**

  - Face fetch la API pentru a obtine serviciile.
  - Creeaza carduri HTML pentru fiecare serviciu, afisand imagine, nume, pret si butoanele “Details” si “Add to Cart”.
  - Apeleaza `addCartButtonListeners()` pentru a activa butoanele.

- **`addCartButtonListeners()`**

  - Adauga event listeners pentru:
    - **Butonul “Add to Cart”** → salveaza item-ul in `localStorage` si actualizeaza badge-ul cosului.
    - **Butonul “Details”** → arata/ascunde detaliile serviciului sub card.

- **`updateCartCount(cart)`**

  - Actualizeaza numarul de produse din badge-ul cosului pe baza cantitatilor din `localStorage`.

- **`filterProducts()`**
  - Filtreaza cardurile afisate dupa textul cautat si dupa categorie.

**De ce:**  
Pentru a avea o pagina dinamica unde utilizatorii pot cauta, vedea detalii si adauga produse in cos fara refresh.

---

## `admins.js` – Pagina de administrare (`admin.html`)

**Scop:**  
Permite adminului sa adauge, editeze si stearga servicii prin API.

**Functii principale:**

- **`renderTable()`**

  - Preia toate serviciile de la API si le afiseaza intr-un tabel HTML.
  - Tabelul include imagine, nume, pret si butoane pentru editare/sterge.

- **`addOrEditNewProduct(e)`**

  - Gestioneaza adaugarea unui serviciu nou sau salvarea modificarilor pentru un serviciu existent.
  - Determina metoda HTTP (POST pentru adaugare, PUT pentru editare).
  - Apeleaza `renderTable()` si reseteaza formularul la final.

- **`resetForm()`**

  - Curata formularul dupa adaugare/editare si reseteaza butonul la starea “Add product”.

- **`handleActions(e)`**

  - Detecteaza daca s-a apasat butonul edit sau delete in tabel.
  - **Edit** → preia datele produsului si le pune in formular.
  - **Delete** → sterge produsul din API si actualizeaza tabelul.

- **`getTableRow(editIcon)`**
  - Ajuta la determinarea randului din tabel pe care s-a apasat butonul.

**De ce:**  
Pentru a gestiona catalogul de servicii usor dintr-o interfata vizuala, fara a lucra direct cu API-ul.

---

## `carts.js` – Pagina cosului (`cart.html`)

**Scop:**  
Gestioneaza cosul de cumparaturi: afisare, modificare cantitate, stergere produse si rezervare.

**Functii principale:**

- **`showCart()`**

  - Construieste vizual cosul, afiseaza fiecare produs cu imagine, nume, pret, cantitate, total si input pentru data rezervarii.
  - Afiseaza totalul cosului si butoanele “Clear Cart” si “Confirm Reservation”.
  - Atașeaza event listeners pentru toate butoanele.

- **`changeQuantity(e)`**

  - Creste sau scade cantitatea produsului.
  - Sterge produsul daca cantitatea ajunge la 0.

- **`deleteItem(e)`**

  - Sterge produsul selectat din cos.

- **`clearCart()`**

  - Sterge toate produsele din cos.

- **`saveAndRender()`**

  - Salveaza cosul in `localStorage` si reapeleaza `showCart()` pentru actualizare.

- **`updateCartCount()`**
  - Actualizeaza badge-ul cosului cu numarul total de produse.

**De ce:**  
Pentru a crea o experienta completa de rezervare/cumparaturi: adaugare produse, alegere cantitate, data rezervarii si confirmare.

---

## `details.js` – Pagina detalii serviciu (`details.html`)

**Scop:**  
Afiseaza descrierea completa a unui serviciu selectat.

**Functii principale:**

- Preia `id` din URL (?id=123) si face fetch la API pentru acel serviciu.
- Afiseaza detaliile serviciului in containerul `.details-container`.

**De ce:**  
Pentru a avea o pagina dedicata unde clientul poate vedea informatii detaliate despre fiecare serviciu.
