Task:

> Playlista<br>

Cel podrzędny:

> Wykorzystanie tego samego komponentu co w liście piosenek pobieranych z api.

**Problem 1.**<br>

> Jak dodać do tablicy playlist element song tak żeby React się odświeżył.<br>

Rozwiązanie:<br>

> W handleAddToPlaylist dodano<br>
> setPlaylistSongs((playlistSongs) => [...playlistSongs, selectedSong]);<br>
> choć wolałbym dodawać jeden element wprost do tablicy niż tworzyć nową tablicą z poprzedniej plus nowy element. Być może jest to mało optymalne ?

**Problem 2.**<br>

> Przy umożliwieniu dodawania dwóch tych samych piosenek do listy, klucz oparty na URL, nie jest poprawny - postanowiłem, użyć unikalnego klucza generowanego przez uniqid() z biblioteki uniqid,<br>
> Przy dodawaniu do playlistSongs trzeba klonowac obiekty, w przeciwnym razie playlista nie działa poprawnie ponieważ przekazywanie odbywa się przez referencje.<br>
> Przy kliknięciu dodaj, za każdym razem dodawany był obiekt do listy poprzez referencje, a ustawiając nowy klucz uniqid, dla jednej pozycji playlisty, tak naprwdę zmieniał się klucz dla wszystkich pozycji tej samej muzyki.

**Problem 3.**<br>

> Pozycja dodawana do playlisty wyświetlała się bez ustawionych nazw i wykonawcy.<br>

> - Próba znalezienia błędu przy pomocy Console.Log nic nie dawała.<br>
> - Zapozanełem się z Kurs Reacta - Fundamenty -> Testowanie i obsługa błędów -> Lekcja 7 Debugger i błąd w kodzie się znalazł. Błędnie dodawana wartość do listy plików do odtworzenia.

**Problem 4.**<br>

> Muzyka ma się zacząc odtwarzać, w momencie wybrania piosenki w playlist.<br>
> Rozwiązanie tego zjadło parę ładnych godzin, ze względu na brak znajomości cyklu życia komponentu i momentu jego renderowania oraz uaktualniania właściwości w \<audio\>

> - Inicjalizacja audioRef w SongPlayer powodowała, że nie umiałem jej przekazać do funkcji App::handleSelectPlaylistSong()
> - przeniosłem audioHref do App, przekazywałem do SingPlayer
> - mając audioHref na poziomie App w pierszej kolejności w App::handleSelectPlaylistSong() próbowałem wykonać audioHref.current.play to niestety powodowało, że dopiero drugie kliknięcie w tą samą pozycję odtwarzało muzykę.

> Okazało się, że w momencie wywołania Play() komponent ma jeszcze nieuaktualnione właściwości i ponowne renderowanie dopiero wykonuje się po wyjściu z funkcji.

Rozwiązanie:<br>

> użycie useEffect w komponencie SongListItem. Jako props onAfterRender przekazanie funkcji z App wykonującej audioRef.current.play();<br>

Rozwiązanie 2:<br>

> Powyższe to przykład jak można utrudnić najprostrze rzeczy, wykorzystanie autoplay z \<audio\> i przekazanie do komponentu poprzez props realizuje to samo co użycie useEffect i wywołanie audioRef.current.play()

Pytanie 1:<br>

> ~~Czy miejsce audioHref jest poprawne. Wolałbym, żeby było one ustawiane w SongPlayer. Wtedy jednak mam problem z przekazaniem go do andleSelectPlayListSong.~~ Ze względu na Rozwiązanie 2 problemu 4 pytanie nieaktualne.
