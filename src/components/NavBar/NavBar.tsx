import styles from './NavBar.module.css';
import { useState, useRef, useEffect } from 'react';

// Ahora cada audio tiene nombre, artista e imagen
const audios = [
    {
        id: 1,
        nombre: 'Africa',
        artista: 'Toto',
        src: '/Africa.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b2734a052b99c042dc15f933145b'
    },
    {
        id: 2,
        nombre: 'Diva Virtual',
        artista: 'Porta',
        src: '/DivaVirtual.mp3',
        imagen: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExMVFhUVFxoXGBgYFxgVFxgYGR4YGBgXFxYYHSggGB0lHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0mICUxLS0tLS0vLS0tNS0tLy0tLS0tLy0tLS0tMC0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAEDBQYCBwj/xABJEAABAwEEBQgGCAMHAwUAAAABAAIRAwQSITEFIkFRYQYTcYGRobHBByMycrLRFDNCUmJzgvCzwuEkY3SSosPxFVODFhdDVJP/xAAaAQADAQEBAQAAAAAAAAAAAAACAwQBAAUG/8QAMhEAAgIBAgIKAQQBBQEAAAAAAAECEQMSIQQxEyIyQVFhcYHB8LEzkaHRQhQjUtLxBf/aAAwDAQACEQMRAD8Ay1Ma6azN1HjiV1RGsu6LNV3SfNe6fOylX8AwbqD3h4rSPbqdQ8lnnjUHvea0VQ6nUPJYJ4h3XqzZ8hrVN+idms3oODh2kdpWP5f6Kq2OkLMym2pYq1e8yRLrPUfGo0/ZF6SOlw6ZtHaVFmrNrOcGtadYkwLpwPd3r03Swa6kQ5t9jsDtA2td1ENx2Z7FBn6mS13nqcBPXgp/4nzDpPRzqbiIQbMndXiF6HyusbXPvNjFgJ6cfksTUZAdljd+ILpYq3KMXELIivriHOHEqNEaRHranvu8SoGqaS3ZTF2kxiugNU9I8ClUzXQGqekeDliRpJZaQIeTsaSOprz/AChR7FNYXxfG+nU7bjwPEojShBZZ+FFo6NZ6NLaxbk1OvEgsjJIHE+H9EbQ2dA+JC6P9odPkURQnA7xhx1tiox9kVke7++JFT2I+0/V0fdf4qs5zJHV6kMoyT7L8uk7EaaMnzXr8M4p0ZG5BWl2Mbl3UtRju/wCYQxM4oJzVUhqTGXC7HkVyApmhiLrkh9c78p/ktLooeuodFq+F6y2hKZvODc4En9bJ7pWj0VhaqeOAp1u/nZVEIdUhzdtvy+GVNZv9jj+/Z8Np+apy2J6/EK7rD+y/+dnhaFTVPtdfiFrVFMHZACiZwQoRQyWRGD3ikuE6KzjW2IYlE0mG67pKgsOZ6FY0W4O6Sr0fOZpU37FW8ag97zRGm9P0qDbnt1IGoDlkdY7PFUOndNQOZp+0Cbzvu/hbx3nZ05ZlR5uJp1Evw8F0lSycvAK0ppKrXJdUdOcNGDW+6PPPivo7k9pMV7LVpNMVLMX0HA4kBsim7iH07pnidy+aWhe0+j+zMtGjhW5x7bRZr9MvaYc6m3XYx5zcy6QIOGHBSc92ejJaY1FbeHIzHKeW9TQO8rHOdId+n4gFs+VVQPDyPwrIVXCHxhIZ284D4Qrc117EPB9j3BtJmK9XAe08RsxkYdEoPCRHD+qL0u31z+LihGZjpChydpnoY+yvQesNY9J8SprvqnH8bO9tT5Li1Nh7hxPiUVA5l/Cqz4aqxI6T2QAF1GCYJzksQTJqLy2CN6swZpUPcd/FcqhitWVBzdESJDXSJxHrXHHqxVON7E2Zbr1+GVk5Iy1g83Rj7tTuMnuEpUC2bPfi7JvTlF8zPUu6dWbgwhtK0R/+dQofv4Nk9/S/krUpSThqXTY+x6TZnoKKo2RzmOcBDWgkk8Ng3lWujNAucA6oC1uxu08TuCN0+btAsAgYDKBEhVQwVFyZHPik5qEPEqeTuZH72K/0e+LRT/Lq/wC6gOT9ifcLw2ABjxRVjqg1mbw2p4PPmmxjUFYnNJSlKu5fDKq01zcFPYXtfxkc6OzWVZVzPWjrS7AdXi9BVBietIkXQB25ItmSFZki6eSGAw4hJdpkRxqrAcXdHyRGm7XzVIiSHVXFrY2QJc7sw6SoNHs1ndB8QrDTugTWdTfJ1SWujY2HGRvN6B1qrI3p2PAejplq5HmTU6cNIwIg7ikQvKo+hHatJyZ01aLM57qbsKjCyo10lrmkHMbxJIOzoJBorJQLir9vN0qbrzheIIAzMxuVOKFq3yEZslbLmQ27SJcCCqou/l+IIarUJ7FOxvi34wFksjkzo41BUgnlDSiu+N89wJ8Sq+yj1jPfb4hWHKhkWqqNxHwNQFiHrKfvs+IJWXtv1Cw74o+i/Abpxvr6vv1P4j1y36qp+azwqojT7f7RW4Oq91V4Utvb6s9NH+HUWrmwG6il97ikZ5HwKfZ++Kan5HwKf7PWPNAuQ98xNRFB0Fp/eaHai6NPAHh5p2NWhczm1Fl2kGuvQ3W1S2HEkluOcTntXDXuEEGMHDqcC1w6wSuaVIugASrzRui2AtNUzGN0Zda2GOU3sLyZI447+fyV+itFVa5im3pccGjr8lu9EcmaVCHHXqfeOQ90bFXP02ykLrAAA2ABgB1KptvKmq4wDAG5UqMMfNnn5P8AUcRslUTZ2uhCzumbPeFze5vxBVjeU1WBjMb9qt32sVKV8bseBTozjNNE8eHyYJJsg0ra3UmMpMENebpdviJA7UJY3D6QPdf4OUtotYrUQ3bTqAjrMHxQV6KvQHeBQT533bFmKHUcWt97BKzsv3td80K84nrU1TMfveoH5lSM9CKImjBE08kOzJT0slkQjqUkkyM42dlbi/3T4haayVg5jt4+az1mHtn8PmFYWd4BxMYq2Ss+ZyS3M9yvsNIw5rAHk4uGbp28TOG9Yyu4XjAwlerPoNqUi17WumJkY57xiqK28i6BBc19Rpww1XN45gHvUmbFJ9k9DhONxwjpm2YZtYjIkLh7ydq1Vq5DVBiysxw/E0tPdKqNJcn61AMdUuXXnVhwJOJGX6SppQyLmj0sfEYsj6rK80jgjWUTj+n+IFNZ6EuDf3kEdWoQD+n+K1Njj2bBnl3SIeWlKLZWG4s/h0z5qmsP1tP8xnxBaHl1ZyLZVJI1i09lJmfTHes/Ym+tp/mM+JqTkTsPDXRr0LblE2LRaT+K0d1Z/wA1YWjRpc2qwGTTFIjD2i1rmgZ4TKe22RtSrbi4HUp2t4g7RW/qrNv1lo6KfmixrcRmm0tvu6PPmlODhCYOkCdyeEotJKQVpZaeqP3tVZSWg0fQJAAVuCNonzz0q2VRtV0ABDutjt6sbZowsaXOyCqYkxkgy64ugsbjJWhF85p2Nnb2K10ZosOuvvU7v2g449Q2rS6Y0RZHU3VGtDajnEtayGkNyEtbgBhOO9FDh5yVsDLxEcbS8TKWOz0zx6/kr+x2RopOA2iEDo3QbibwceH9StF9FDWxuCpwwpboh4vPG9MWZ6xWXmqj6TjJgEEZEYOHcoXviqf1eBVsG6t4txcbt7g3Z3KhtbiKx3Y+CGa0RXqNxSc278P/AEgqZhQuzKc1JITHapGy5HIyPSPNS0DgomjV6x5qSgF0TTuUk6ZGab2xDVqe4fJJj5J95KxGW1PcPiFzYJv/AKj4FXHzLXNlhZqmp+96mrv1D1eIQdE+r/fBS1Kk0x0DyWUIrcIqOwPQqjlFol9ooUubaXOpPkgZ828CXdDSyT7ysqwlrgMyCB0wubNULKZYTF6i6m4j8TSOsTCXONqh3DZOjmpGDsLC20sB3T2tMIy0nGoPcMf+ZgVhb7OOdokfZpAdd56Dt9mc01HkarrgB4ttDZEdBCW04xZ6scinOL8l+RvSE8fTKkfhnrpM4blmbJ9bT99nxBeg8rtF0qj6lU3r1+7gQBDbK6oNn3mDvWBZAqtOwPZ3EKaatluFrRRqS7X0h+Ra++s1dC3C890H1vMgZYXmudj2KG8C63EGQaNqjcQarYQNatdY12cGgeym9bDZk81qVfe4zrBgOhdOTAYLuoMezwSaL29zqjmttyZpAkLEU1t+SjsQruG5Hnf/AEP0mWumNG3mEALzy3WNzHEQvXYBEFU2k9H0nHIJs4LIjzeE4t4dnujzeg104A9QWn0VYXvzmNpKIdoy6cMleaOaYAW48WjvKeJ4249QKstjDWgBC24RPQfAq2LoGKotM19V3QfNGnZ5cE3JFRQtINGIwL3AdIMg96obc2Kp/exFaMqE02jZLiOvND6SEPngk5Hqxpnu4YaMjXqA1WwQuDtUlbYo3HNSMuQm+yekea6oJm+yekeDkqK5HE0pkpTIzj0Gw12uoPwAcKbr2H5YBnjBPWnpVg19wA4vdH6S9VRtPN4f9yWdoJ8WoltSazTvfV8XqvvPAlC02GB0MjgPJcl/qh0N8kPSqerHut8Au3u1OxGTuNOvMPvKKqZHUmfVhpO4Ermm6WA72g9olcLS7wFrIMEzl1SSY71W6UtRvupxqlw2/wB41/XlCtH5nob4Ks0yzWvDePEIMi6p6HDNa1Zo+V1drS9pe0E1CYLhMfQ3tymYkx0leYVcT0wtR6QHTaTOYDR/oCy20dXioJ7M9Xh94KXiaCxnUtP+GrfG1DW/6nqo/A9S2J2paP8AD1fiaq2rWJbEmNTuaQESASuT9f6AlJW9rs8AoiitJH1ruhvwNSe4qfP9/ghatnyQMkLFha/ka7EKvh3uRcev9lmxtFWFQaQteMSry2C8CN6w+lnGnUunqVVqKs8fhMSyTo0FlrTnCsaT4WTsdrKtqVpR7PkbnwOLotKtq4rO6atOq7oKJtFZUulny0jacEM+rFsbwuHrobRghjB1qHTQh+G4IylTIa0HchdONxHuhKmqx0ehjd5b9StrZBROUlU4BRvUbLkd0/ZPvN8HJqK6ojV/U3wcuWFcjlzZKkmlJEaaPSTh6r8z+Vyn5PSSyfsgEdbSs/XtZMY5Ge6PNaTQzbtx0wCBM4AasZqmMtUtjyM0HjxUEU/qx7rfBqkedTs8lFZiXNAA+y2YGGQXVRwDTLmDDa9o7iU4ikm5e5K54+a6NUBhjAAYDgq99uotGtWpzuDrx/0goavpez3XAVRN0iLtTODh7MIXOK7zVw83/i/2YR9LaZ6Am0uBF7YXNhUmjHF5JnBoZOE5kDqWg0+6mxlJryRMRdg62yeCBT1RsqeLo8iSKflg8uqXztAwy+zuWfq04idwPatHyhaXND/akYGIMgQY/wAwjoVPpWhdFI/epMdt2jPEY9Smyx3ZfwsqhFElhratfjQqDtLSgHHD/L4FEWIS2r+U/wDlQpy7PBB3IbFLUyIozSRF8iMRBnfLKcDqg9qCKM0hjVI9z4WpS5DZdpej+AcLR8lK91wnes44EGDn88QjLBai04DsT8ElGQnPj6SDj4nq1QNIB2FZflbZWuDXNxMwfHyQ9avaKlMMp6snFx2DgjrBokhoa5znnaTvVtXseFjh0ElNy38DP2AQYVuxc26x826dilTIKlRRmyLJUkCWp8FVFrtYFRgOQMlFaTqwAemOpCUtFurWerWHtUdc8WZO7M+oqfPkfJFeCEYxUpd+3wWdSpPah9OtGpH3VU6N0hdhjjq7D93+itdOMlrC3cf2F3SrJjbRqx9HlivUpneyo3ZKVw1VG8YKRlyJKOX6m+D1E3IKazDD9bfB6ibkOvyWGLmdpJ7qSIIiomQ7g35LqtaX4tvuiSIvGMDhguLNk/3D4hcWj23e8fEpTbpGUmxOqkgySetc3+K5nBcpbkwkjqUiUySyzTS8l4uVydhofE5T8p6l+pRZMQJnoxQWgPqLT02f43ILSVcue3GYgKxTSx0/u5Asd8Q5eH/VGs0swVKLHiTdYZMyZl/2T0eCx9oql0NJgMlgmcBJI7FoKL3Cq+kS4gUogb5cdm3EZblnnM1qkiIc7HGBBgx27VuVv8hcMq2/Y6p4MJG1rh4JqLaRAvucMDk2ccYHRl2ppF0wNh8kOTgEpseo3Zwi9ICaruhvwNQiK0p9a7ob8DUu9hj7S9H8A4U9F9xwKgYFbVdHMcA5tRpECd4TcUW90Bkklsy4sunmDA7FeWTSbHZHiss7QLHQaddhnMHNB2ihWokmRAiYMjFWdJJdpHly4bBl2i6f3xNlb7Q12HA+H9VX2t8Khs+kiRLjtA7Z+Sm0jaYp8TgjWWOm0ZHg3FqJBba4dAEyC7viIK2nIOx3m1KTph1MtO32gQZXn1hM1G8DK9d9HFkm+84Tj3YeKRquMpMfxEa0wXieLVaRY4sObSWnpaYPgpqVucGhhxaMhunOD5I7lZQuW20NGQquP+bW/mVQvPtxex6CqcU36lgCCzBROGBQjHkZIgVgRuKasikbVBmixJA/vafhVQ7m6rDvnyWj0dTpGx2aLnOG2EPiL92467O2M4niqCo71NP9X8vzRrl98hKl1/vmdJKX6HU/7b/8jvknRB6l4lUxxEwcxB6EzXa09KYLkHFSt8hrQ5KZNKdCcJOmSXHB1itj2MqNaYD7l7AGbplufFQF5c+TnIT2dhIdAmBJ6BiSuGDXA2yOmZ3JlukBSts0Nnr/ANrOXsx2QD59qrnMaXVZJEVHxAJ37j+5KmGFpeZOqN0bWjEHpUZpy2od9Q98Kp9Ze7JoRp35JHL6cMmSWlzhjqzF3KJOX7wQdWnDWmIBmOqJ8UfdIs3RWc0ndLGdu3oQ9qHqac5y/wAWpMxsG/5fyBAIzSv1zv0/AxC0ziiLc+9Uc7efIIEuqMfb9n8AynpWZ8AxgcFACiKVUxtgR8kUFG9zZX3Blm0WcHOdAO7NHVtFtIBvOiMiZniUC23ZBGVLdAA3D9+KsgsaVUSZFl1KmBWixhmI2OEdGM+SDtFYuPgi7XaSW9YXWidHF5DiMEmdN6YjdWiOqQXoXRbnyQMYdHTGC9q5F2MMomOAHQMB4LFaCst0gAYnIcTkvUNF2Tm2Bm5rZ6cZRZupDSQYZvNm1dyPn/0j0LukK34rrv8ASB/Kswtt6XaN3SDj96m097wsQop8z0sPYQlJSouIJAJi8TAJgASSY2RPYolb6EOpW/KrfwnIUG3SOuTft0/z6fw1UJafqKPG9/Ii+TI9ZT/PpfDVQtpHqKH6/wCRMT6v3yFP9T9vxIH5w7z2lJcQkstjqQwUe1SBR7ULCHSTJnZFCYT/AEap9x/+R3yUS9ysumrFXaXtrtIp3b+DtWcBs3rw45opRoCEtXNElM4HqUthxrU+NRnxBdVhTFKkWn1hL+cEnAAt5vDLIuyUVlq3ajHxN17XRlMEGO5bfI1rZlta8LTaeE/xKY81WPtLsWA6t4npxRFst16tXqXY5ycJm7rMdnGPs96rpTJz8PMXihUVfl+EXtiovq2UsY287nxhGeqMTujei9NaKeG2ek2ndJDWGcBzryB7WRkgyQrL0X1nXqrRldJ6y0jyCvPSraC2z0LpIcKxc0jMEYgg7MpRPs35AqtaXmzz606Fr02F7mC61xaSCDBmMY45IOqCCZwIJ8lZ2OrXqU3h1ZxYddzXa0lpvYE5Twz2qO00wbSQRgakdWrPiFij1bC6ROekq0XYmAhzT9qOnArm2U2g6nshtOSCSA4saXgnYb17DZlsULCcSNhHn8l0Gkw5K0Ww0WGkEmVJVogDHKB3BCHSZMSotKWwuDREANnpvQQexUyyY4q4k8Y5NSTGtTpb+sDuct/oXR/NWWm94h1wGCIIMbRvVFyR0Y3nzfF640uAiIOrB7HlablNbvabgOAyCLDC5amQ8bl1NYkBaO0m5tZjwAbr2kA5GDMFeraI0xTtAL2YABocDm10ukHux4rw+z1LtTHY7wKn0NykfY7WHSSx9V7XtnAgilHZOC3iYxlFP2CwRlCdLlzLP0zUG8+Hn27rQ3iJfe77naV5qvSPTKQ51mqD2XNfB3g82QvNV5+TZno4HcL9fyIoix2s078AG8xzTOwOa5pPY5DJ2/NLG1YVZvq4/vWfDVSb9Uz33+FJHtdR+g0ou899JN771y667PCZhAUfq2e+/wCGn80dC7t+/wDZzCS6SRG2DqKVKoSlsadApiUyZxwWGHsuj/RfRYHEWurL2gEtut1ZDiDnIlrexed8jtAtttpNB1QsAY594AEy0gRj0r13TVpFyhA/+alt4rzD0ZV7luJ/uqg72p0oVJImhluLka+j6M202PH0hz+cETcaI1XjDW3vHYhW+i1n/wBipn/228OPHuWm5VcqHWWzis2mHkva2C4tGs12MgcFlLD6THPqNa+iym0kS7nnYZY4iNi1qKdM6MpyWpBNr9GrXnCsWyfs0gM9+tj7PeVJavRfTcAW1CyAfZYNbplx3bOKnPpAYXFtIte4PDQHEiQSBeGGO3JG6V5WNpNcCKJqQS2nfLScYGGZnHs4LeqD19iu5I8k6llrVDJfTewAOwBB2giYyJIIwPBC+lphFGzyI9a74SrHklp91pqVKb6badxofIcXzJjGQI+fWqX0sc4BRBa3mr5LXB2N66AWlvRiCP8AkttGwMW+m3JOSvJOnVsjKrqj28410w0EDFzcN/s96R5Hgvqc443TUJaQNYtPNgzjDcWnYUfyJfUdY6YcA0Y3IOLgHOJJAwaZcYG4dSG0xywdRqvp3AbjiJLyJgU3DCPxkdSbFdVWJlJ9I1HnuBs5CU7jgK78db2AcG7M+K7ocgaV10Vnkh4EOaADGGMGY1+5QM9ItbAigzCPtnj+FFWTl+Xtqk2ak0tLXNaKhF8kwQMOErKjtsOl0yTB/wD24IxdXEEAgNbO4EGf1dytT6OabjSLqzjcDAW3RDoERMzGr3qG08tHClQc2gCagbhfOAN5xxjZdW4sLnPpU6kDWa1xAMgSJI6pQxjGthc55FVmQ0NZYt1dmQuOaDvwpxhsENRum+SbqvOPZUl5cLjcLsEgEudw1jhuQ1a3llqc1gBcXkGTAkAjE7AACrvSOljRs76wAcWjKSAZcB5qhqUd0S42nPdehUVuRFKZ5942nVBx27d6grcjGBxcLQ4E3h7DTnzQO38A7VNpTlay5LQybl4684/d7ln9JctXMaCKbXXi/wC2RlzZ3cUE+x1uRTFT1bGg5X6EbaqFG/XM070ENbjMGInDb2LMv5BUYn6Q/wCrv+w3dMZou3cpz9DBFIFzC0+0djgCcs8VBYdNPqkMuRNlccCcLrejb5Jc4RcqYeOU4w27is0tySp0qPONquceduYtAjjgVk3NgkbpHZK9B0u6bOf8R5rAVfbd0u81PmgoypFOCbnG2KkdX9bfB6loO1Gj8bj2hnyCgYdT9TfB/wA1ccl23nsbveeOYYsgtTSNyy0xcvD+iulJW/8A0g7x++tJM6Ni+mh4lCoSplCpyo6Y6MdyL0xzZfepmb19zuB5yoGgcLgYetBJnZLjj2rTxc51AUw8tAvGBMOBZdJIGBglYD0dx9NM5c3Uy6l6lYrS6QLjAAMzIGYOM44Ak9C8u9G1drLbLiMabw0Yaxlpuic8AexWZI6ckTzME9WKS8F/Zf8ApBrONnu60c7hOUXW3dnF/esBZXtDgXCRtH/K9Y5bsFpoc01zWgPD70T7LXmI7s15HTgxJIHASeyRPalZ01Mo4SSlj2JrDaBTqB5BIBBw6RvRfKTSrbRX51gc0XQ2DE4Fx2HioXWSm5j6jHVIYWghzGzrEAEAP6e5DVW0owfUJ2A02gcJIqGOxJZSqNv6JXE1q5k/Vt3n7SsPSzVmlRGMiq7MR9gKr9Esc9Wkx6tu2PtE+S79KFSpepgucWXiRI1ZutGB7R1FUL9Iie/E/fA1HIm0M+gUWuOIa7P3qhEHhdlYLlWGm2VWzE1QCdwLKWJ71teSNIGwUdUkmRgc9YiCJ23z2rE8pqM2ytN4C9BwkiGUpwkTnvTH2FQOJ/70r8ysZSEgAzIB7su9WlksWRjOFFoiwSL5J5sg3XXW3icsWX8MWu2nLitLRs7BZ2mXYvaPZGMN3XuJxTsCTVs7icrXVQNbKAZZaO8Mb4PWjstgtD20nM9kson2wMAyqDhO97FltJWtrqbGC9LYBkAD7WWJ3rd8m7UwUaOGPNMkwPujimNUqQnI6py7zKPqE6Tu4fXVJnIwyqfJaLlNTH0SoRhhv/G1ZD6Re0mXNxHO1SIMTLKsEEcCtVpyuTZKgI2DMyfaHBYraMyVHJD2/Jhecim8RN5uc5QZnLHKFR2ypLGnc6oOwUloK9IijUc4RqtLTwcSD4KgpsJog/iqeFL5JHEf8UWYZJ7+fwW1WsW2WrdMEYdRNKe5xRWg3OdUpki8TZnyJicGTj+81V1Sfo9U73D/AGfkrHk9UAfTxaP7O/2hIyahbua9vyC0lCXv+C207Vu2UudTujngScTuXn73S8kZEk9srccp3O+hVJc0jnWREbDwJhYRoxCVxHbGcL2DoHUPvDwcrzkg/wBdTH94f5PkqMiGHfeb4OVzyWtDGVGOe4NAeTj+jd+8EGLaSC4hXjlX3Y0N1JCf9So/fHf8kk+14nnaJeDMgoVJK6rWSo0BzmOaDkS0gY4jHoUZ7FkKTlKLO8i8GuiCZgxAgE9AkSeKZtFxAIa4hzroIBILsNUbziMOIXUdaPWKFaoYdddEYSDHSDtbO7I9/n/JOgHWiHAEBpMmDdILdYdHzQTtN2ogA2muQBABqvIA3DHAKG7VpODtemZgHFpkRIneMJCqyZ1OSdciTFwzxxlG+Z6lbDSIAq3KhmQ0tD21MDi2cJieOe2VVONiulzLNTdkcWMw2EGB+IHcRxELF1K9c6rnVDc14N43cjeg5bDPEKf/AKraQyRUdBJLiAMwWxOGGMdKN8RF7tAQ4XSqs9H0a2i5gIsdBocWT6pgB17s4jhPWUUdFWO9jZ7MM8BSYftOGQbwXl1i0jaHuf6yq83LwBc50kFpECVLS0/UhzHl98yL165dN6chkRisWaHgZLh53tI9D0ZZ7MytUNNgaWmIYwMGJMZDEYIHltoyramsbSYBzZc4lzokNBvHtKwNTTlpa8llao04Aw44xliuv/U1rmXVnO3yG4g5jLALJZ4tONHR4SUZKdno/Jlwp2agypUDLpcDDb5lruGOYhEWn6OXFxs9N5ALnvexp+7nhtho4wF5aNL1S/Ve5rC+Q2cACZAWhtOnn3i2++Q9xIB1S1oJIu5ExdAMbCmwyxcarlSFT4aand87ZtKTrOWYWak1t8iA1rbuZi7Ebe2VbijZ8uapXWuMC42BHACMhHWvJ7NpGqGmKj5FSpOJy9XsOSI0lpeqCHX3kEEkFxg3p+YxRxlGjnw82+Z6HabJZA6DRobMQxkY7cvNU+kbe2rQfTs8CmyKZLYDXABphsfYgxxjdn5tX0nVfM1HQRBF4wRuI2rV8hrReD6U4HGP0wfALMeWMp0js2GWLHrbtoGsAcKrXwJaTPDUqNWgttpe6g4E4Fowy+0qAVy0HH2rpn9+8VNWrOuMlxxY2ccJiTgqI0lQOWLlJSIuUdYCzXdppsHY4nzVJZazRZzOYc+B7zWfIqXTlSWjoI7Lqqb2rHHyUOedZH6FeDFWOvOwx9qvUnUwPtAzjtu4drVZ6Nc1tVodg36OJneWMPbms4DE/vaj9JCpTNN5Jh9JhbB2BjAejEJSyPtPuGygr0+Nmo5UE06LywubFQRGIE8d/SsRJJG0mT4qx09aXmrUZedcvzdk3ZjOMkJo8etZ0O+Fy3NPXkr2BwQ0Yr9/4B2+yelvg5S2XPrPkmos9U87nU+++u7IROInF0YxjGB6jCSu4dJ8x5SSlJYCCEq8tNi5tjnOe3XotEkuN596m8QY1sAcsBGMSqJKFydByjZYMoEAVBLmBhxvXLvtBzCcYMnBu28N6J0XUbNnbiB9ILsXCJApQTq8CB0qmSWp0Y4WtyWg5oc0w4YjG+BHGbuCMt9ndTbrtdruvD1gMxeBdEY5+1tnNVy6nLghCa3NBaa7DUrQHSabgTeEFtxt1oEZ4f6QgrLQBuNvECr7WsIDb1xpdIg609ESgCma7Pjn3HyCJysWsdKkyanRZecagJY27eDXtvC9uJaQ4jHDftS0qSazyYxMgtxBbAukHbLYzx3oZ+a5WXsHW9jpJklgR3TzHSFcUGTXeTvI/wAxYw9zlTUziOkK/sVQc445XneDqBTsO+wnK6J9G0hePGpXHYaXzR9s0eX0mwMmjwCgsFLXH5lc9ponyW00TQaWRwHgvQxJaXZ5nEcQ8ck195nj9RsFW3JfSfM2hjj7JIB6DI81Nyr0dzdQ4YSqJjcV58k8WT0PUTjmx+TRpqjpYN4YO4M+aVorEMAO7Do2KLRjTUYYzayOkDmwn0nTwZuICrjJ6LJ6WrSwPStScIyE9oagzT9WXfju/wCmUXpBkOcDsYPhaR3Qp7GAGPH4nfw0iUdU2NUtMFRSnb+9q7tlpe8NDnSGNutywEDDBSW2OcdG/wAyhqqne2w5U6YVpV4dWeQZBdgepdaJ+uZ0O+FyFrZlT17G9lwuiHDCHA7NsZZrbblqAaWnRfdX8Csw9RV96l/uKGkcesrgZdnmnYUNh1zJLySjvJLDqOU6ZJcEOkkkuOGThJJccSOTBJJcYcuXKSS40dJJJcYO3NW9HNvvu/2Ukk3FzAnzReWH6xvvVv8AbWy0Tl2Jkl6cOyzwuM5r73syvpC/f+lYofLwCZJQ8V216I9Xgf0EaDkzm73f5mIrS/sNSSTofpsVk/WK7TX1r/ymfw6aVL2X+87+GEkkqPaHPsoq7X7bunzKgqJJKaXNlUeSHq5npUdHP98UkkL5mrkOMj1eaQSSXHCSSSXGH//Z'
    },
    {
        id: 3,
        nombre: 'Don',
        artista: 'Miranda!',
        src: '/Don.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273143c72a64d265868dcc0dbc6'
    },
    {
        id: 4,
        nombre: 'Frijolero',
        artista: 'Molotov',
        src: '/Frijolero.mp3',
        imagen: 'https://www.sopitas.com/wp-content/uploads/2024/04/historia-frijolero-molotov.jpeg'
    },
    {
        id: 5,
        nombre: 'Latinoamérica',
        artista: 'Calle 13',
        src: '/Latinoamérica.mp3',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSqR_2U-AVzWMOqO1o712tWEWBmLEjXAj1KQ&s'
    },
    {
        id: 6,
        nombre: 'Me voy',
        artista: 'Julieta Venegas',
        src: '/MeVoy.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273a043fa84be801dca33dacca1'
    },
    {
        id: 7,
        nombre: 'Vale la Pena',
        artista: 'Marc Anthony',
        src: '/ValeLaPena.mp3',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273536c9d3bdf8a3959efc41a0f'
    }
];

function NavBar() {
    const [busqueda, setBusqueda] = useState('');
    const audiosFiltrados = audios.filter(audio =>
        (audio.nombre + ' ' + audio.artista).toLowerCase().includes(busqueda.toLowerCase())
    );

    const [currentAudio, setCurrentAudio] = useState<typeof audios[0] | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (currentAudio && audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [currentAudio]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
            setCurrentTime(Number(e.target.value));
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    // Formatea segundos a mm:ss
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <button className={`${styles.icon} ${styles.menuIcon}`}>...</button>
                <button className={`${styles.icon} ${styles.backIcon}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button className={`${styles.icon} ${styles.forwardIcon}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
            <div className={styles.centerSection} style={{ position: 'relative', width: '100%' }}>
                <button className={styles.homeIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </button>
                <div className={styles.searchBar}>
                    <span className={styles.searchIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="¿Qué quieres reproducir?"
                        className={styles.searchInput}
                    />
                </div>
                {busqueda && (
                    <div className={styles.audioList}>
                        {audiosFiltrados.length === 0 && (
                            <div className={styles.audioItem}>No se encontraron audios.</div>
                        )}
                        {audiosFiltrados.map(audio => (
                            <div key={audio.id} className={styles.audioItem}>
                                <img
                                    src={audio.imagen}
                                    alt={audio.nombre}
                                    className={styles.audioImg}
                                />
                                <div className={styles.audioInfo}>
                                    <div className={styles.audioName}>{audio.nombre}</div>
                                    <div className={styles.audioArtist}>{audio.artista}</div>
                                </div>
                                <button
                                    className={styles.playButton}
                                    onClick={() => {
                                        setCurrentAudio(audio);
                                        setCurrentTime(0);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25 19.5 12 5.25 18.75V5.25z" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.rightSection}>
                <button className={`${styles.icon} ${styles.bellIcon}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                </button>
                <button className={`${styles.icon} ${styles.profileIcon}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                </button>
            </div>
            {currentAudio && (
                <div className={styles.audioPlayerBar}>
                    <img
                        src={currentAudio.imagen}
                        alt={currentAudio.nombre}
                        className={styles.audioImgPlayer}
                    />
                    <div className={styles.audioPlayerInfo}>
                        <div className={styles.audioName}>{currentAudio.nombre}</div>
                        <div className={styles.audioArtist}>{currentAudio.artista}</div>
                    </div>
                    <button className={styles.playButton} onClick={handlePlayPause}>
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 5.25v13.5m10.5-13.5v13.5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25 19.5 12 5.25 18.75V5.25z" />
                            </svg>
                        )}
                    </button>
                    <span className={styles.time}>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className={styles.progressBar}
                    />
                    <span className={styles.time}>{formatTime(duration)}</span>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        className={styles.volumeBar}
                    />
                    <audio
                        ref={audioRef}
                        src={currentAudio.src}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={handleAudioEnded}
                        style={{ display: 'none' }}
                    />
                </div>
            )}
        </nav>
    );
}

export default NavBar;