 # GameVault

## Cara menjalankan project secara lokal
1. Install dependencies:

```bash
npm install
```

2. Jalankan development server:

```bash
npm run dev
```

3. Buka http://localhost:3000 di browser.

## Tech stack dan alasan pemilihan
## Tech stack dan alasan pemilihan

- Next.js (App Router): saya memilih Next.js karena framework tersebut yang banyak digunakan di industri .
- Tailwind CSS: saya memilih Tailwind CSS karena membantu membuat tampilan responsive dengan lebih cepat dan konsisten tanpa harus banyak menulis file CSS terpisah.

## Struktur folder
```text
public/
src/
	app/
		globals.css
		layout.tsx
		page.tsx
		games/
			page.tsx
			[slug]/
				page.tsx
		wishlist/
			page.tsx
	components/
		breadcrumb.tsx
		GameCard.tsx
		navbar.tsx
		spinner.tsx
	data/
		games.ts
```

## Fitur yang sudah selesai
- Home: featured carousel dan grid semua game.
- Browse Games: search, filter (genre, platform, year range), sorting, dan pagination.
- Game detail: informasi lengkap, screenshot gallery, dan lightbox.
- Wishlist: add/remove, list wishlist, dan empty state.
- Navigasi: navbar responsif dan breadcrumb.
- Data statis: daftar game di `src/data/games.ts`.


## Catatan trade-off/kendala
- Saya sempat kesulitan membuat fitur wishlist yang dapat disimpan menggunakan localStorage.
- Saya juga mengalami kesulitan dalam merapikan tampilan responsive agar tetap konsisten di berbagai ukuran layar.
