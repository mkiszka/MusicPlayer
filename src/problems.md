Playlista - cel:
Wykorzystanie tego samego komponentu co w liście pobranej z api.

Nie jestem przekonany czy wykorzystanie tego samego <Songs> komponentu do list, które jednak różnią się liczbą kolumn to dobry pomyśł.

Problem 1. Jak dodać do tablicy playlist element song tak żeby React się odświeżył.
Rozwiązanie: W handleAddToPlaylist dodano  
 setPlaylistSongs((playlistSongs) => [...playlistSongs, selectedSong]);
choć wolałbym dodawać jeden element wprost do tablicy niż tworzyć nową tablicą z poprzedniej plus nowy element. Być może jest to mało optymalne ?

Problem 2. Przy umożliwieniu dodawania dwóch tych samych piosenek do listy, klucz oparty na URL, nie jest poprawny - postanowiłem, użyć unikalnego klucza generowanego przez uniqid() z biblioteki uniqid, - przy dodawaniu do playlistSongs trzeba klonowac obiekty, w przeciwnym razie jako, że przekazywanie odbywa się przez referencje, playlista nie działała by poprawnie.
Przy kliknięciu dodaj, za każdym razem dodawany był obiekt do lisy poprzez referencje. Mimo, że lista wyświetlana była poprawnie to ustawiając nowy klucz uniqid niby dla jednej pozycji playlisty, tak naprwdę zmieniał się klucz dla wszystkich pozycji tej samej muzyki.

Problem 3. Pozycja dodawana do playlisty wyświetlała się bez ustawionych nazw i wykonawcy. - Próba znalezienia błędu przy pomocy Console.Log nic nie dawała. - Zapozanełem się z Kurs Reacta - Fundamenty -> Testowanie i obsługa błędów -> Lekcja 7 Debugger i błąd w kodzie się znalazł. Błędnie dodawana wartość do listy plików do odtworzenia.

Problem 4. Muzyka ma się zacząc odtwarzać, w momencie wybrania piosenki w playlist.
Rozwiązanie tego zjadło parę ładnych godzin, ze względu na brak znajomości cyklu życia komponentu i momentu jego renderowania oraz uaktualniania właściwości w <audio>

- Inicjalizacja audioRef w SongPlayer powodowała, że nie umiałem jej przekazać do funkcji App::handleSelectPlaylistSong()
- przeniosłem audioHref do App, przekazywałem do SingPlayer
- mając audioHref na poziomie App w pierszej kolejności w App::handleSelectPlaylistSong() próbowałem wykonać audioHref.current.play to niestety powodowało, że dopiero drugie kliknięcie w tą samą pozycję odtwarzało muzykę.
  Okazało się, że w momencie wywołania Play() komponent ma jeszcze nieuaktualnione właściwości i ponowne renderowanie dopiero wykonuje się po wyjściu z funkcji.

Rozwiązanie: użycie useEffect w komponencie SongListItem. Jako props onAfterRender przekazanie funkcji z App wykonującej audioRef.current.play();
Rozwiązanie 2: Powyższe to przykład jak można utrudnić najprostrze rzeczy, wykorzystanie autoplay z <audio> i przekazanie do komponentu poprzez props realizuje to samo co użycie useEffect i wywołanie audioRef.current.play()

Pytanie 1:
~~Czy miejsce audioHref jest poprawne. Wolałbym, żeby było one ustawiane w SongPlayer. Wtedy jednak
mam problem z przekazaniem go do handleSelectPlayListSong.~~