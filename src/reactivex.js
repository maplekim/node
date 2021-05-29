import { fromEvent, Subject } from 'rxjs';
import { partition, retry, debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap, share } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const subject = new Subject();

const keyup$ = fromEvent(document.getElementById('search'), 'keyup')
    .pipe(
        debounceTime(300),
        map(event => event.target.value),
        distinctUntilChanged(),
        tap(v => console.log('from keyup$', v)),
        share()
    );

let [user$, reset$] = keyup$
    .pipe(
        partition(query => query.trim().length > 0)
    );

user$ = user$
    .pipe(
        tap(() => $loading.style.display = "block"),
        switchMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
        tap(() => $loading.style.display = "none"),
        retry(2),
        finalize(() => $loading.style.display = 'none')
    );

reset$ = reset$
    .pipe(
        tap(() => $layer.innerHTML = '')
    )
    .subscribe();

user$.subscribe({
    next: v => drawLayer(v.items),
    error: e => {
        console.error(e);
        alert(e.message);
    }
});

const $layer = document.getElementById('suggestLayer');
const $loading = document.getElementById('loading');

function drawLayer(items) {
    $layer.innerHTML = items.map(user => {
        return `<li class="user">
        <img src="${user.avatar_url}" width="50px" height="50px" />
        <p><a href="${user.html_url}" target="_blank">${user.login}</a></p>
        </li>`;
    }).join('');
}
