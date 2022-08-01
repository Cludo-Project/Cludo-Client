(function(){var t={3482:function(t,e,n){"use strict";n.r(e),e["default"]={home:{title:t=>{const{normalize:e}=t;return e(["Home"])},welcome:t=>{const{normalize:e}=t;return e(["Welcome to Cludo !"])}},about:{title:t=>{const{normalize:e}=t;return e(["About"])}},games:{title:t=>{const{normalize:e}=t;return e(["Games"])},search:t=>{const{normalize:e}=t;return e(["Search games"])}},404:{title:t=>{const{normalize:e}=t;return e(["404"])},message:t=>{const{normalize:e}=t;return e(["Sorry, this page doesn't exist 😕"])},"go-back":t=>{const{normalize:e}=t;return e(["go back"])},"home-page":t=>{const{normalize:e}=t;return e(["home page"])},"you-may-want-to":t=>{const{normalize:e}=t;return e(["You may want to"])},"or-to-the":t=>{const{normalize:e}=t;return e(["or to the"])}}}},5627:function(t,e,n){"use strict";n.r(e),e["default"]={404:{title:t=>{const{normalize:e}=t;return e(["404"])},message:t=>{const{normalize:e}=t;return e(["Désolé, cette page n'existe pas 😕"])},"go-back":t=>{const{normalize:e}=t;return e(["retourner à la page précédente"])},"home-page":t=>{const{normalize:e}=t;return e(["page d'accueil"])},"or-to-the":t=>{const{normalize:e}=t;return e(["ou à la"])},"you-may-want-to":t=>{const{normalize:e}=t;return e(["Vous voulez peut-être"])}},home:{title:t=>{const{normalize:e}=t;return e(["Accueil"])},welcome:t=>{const{normalize:e}=t;return e(["Bienvenu sur Cludo !"])}},about:{title:t=>{const{normalize:e}=t;return e(["À propos"])}},games:{title:t=>{const{normalize:e}=t;return e(["Jeux"])},search:t=>{const{normalize:e}=t;return e(["Rechercher un jeu"])}}}},3723:function(t,e,n){n(1703);class o{constructor(){this.config={readOnly:!0}}async loadConfig(){throw new Error("Not implemented")}async load(){throw this.loadConfig(),new Error("Not implemented")}async save(){throw new Error("Not implemented")}getConfig(){return this.config}getDatabase(){throw new Error("Not implemented")}}t.exports=o},6925:function(t,e,n){n(1703);const o=n(3793),a=n(3723);class r extends a{constructor(){super(),this.config={},this.database_loaded=!1,this.database_loading=!1,this.bus=new o,this.api_url="/",-1==this.api_url.indexOf("http")&&(this.api_url="http://"+window.location.hostname+(80!=window.location.port||443!=window.location.port?":"+window.location.port:"")+this.api_url)}async _getJSON(t){return new Promise(((e,n)=>{var o=new XMLHttpRequest;o.open("GET",this.api_url+t,!0),o.onreadystatechange=function(){4==o.readyState&&(200==o.status?e(JSON.parse(o.responseText)):n(o.statusText))},o.send()}))}async loadConfig(){return new Promise(((t,e)=>{this.config&&t(),this._getJSON("server_config.json").then((e=>{this.config=e,t()})).catch((t=>{e(t)}))}))}async load(){return new Promise(((t,e)=>{this.database_loading=!0,this.loadConfig().then((()=>{this._getJSON("database.json").then((e=>{this.database=e,this.database_loaded=!0,this.database_loading=!1,t(),this.bus.emit("database_loaded")})).catch((t=>{e(t)}))})).catch((t=>{e(t)}))}))}async ensureLoaded(){this.database_loaded||this.database_loading||this.load(),this.database_loading&&await new Promise((t=>this.bus.once("database_loaded",t)))}async save(){if(this.config.readOnly)throw new Error("Database is read-only");throw new Error("Not implemented")}async getConfig(){return await this.loadConfig(),this.config}async getDatabase(){return await this.ensureLoaded(),this.database}}t.exports=r},1780:function(t,e,n){"use strict";var o=n(9242),a=n(3396),r=n(7139),i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd1XVe53XvvD2eGQ/lXQcKuDwc2eFlCAGnUn7kT6T86J/+aNTgsWPchJJYciEOCQ8hF+G0hFCIHRSEqAuJBCqRaUEIEbmBppAIBGnESwZje8COZ+y587j3PLq+ffadGJix53HvPevcuz60xPjec89ZZ+39nf04+9vLSZKEFArFzHA1BAqFEkShUIIoFEoQhUIJolAoQRQKJYhCoQRRKJQgCoUSRKFQKEEUCiWIQrFo+Gv/8/YH+f/nsMWSHHMChyhxqPTTdyncWyJ3ScD/ztipiB3wXSqu6P17avN+TyFC5ggv4tRnmoxWTP1+5F+Mz17GPvPl49EKBWd3UsfXllPiso8VcYtmPba3fNuKrBVXrGFCbrdPwXndFL49ltI367roOpSUI4pGypv9s7q+ltj6JxqOQ07Bo/DgxGb2/a8cX0CnAWXJ5etz2TqdHiXHKlKj9w6i9XX8Ic41DmI8FVHhmmXk85MmRhCzJoiTWnig9LfJRHihgydxzAxJhBr7Bh/hK3yu+p9568FliTJF2aKMZfVd/kQOcKP6OBmS9+Rjm4zJ6faoeN0gOUn61MncLX4CJ+MRhe+P/dRxhfew2Df4CF/hs4jWg8vQYUKYMuWyRRkLjeHQ8YP0Z9mekVjA8Qj3VVcuoeDiXu63lkUE0ym6FA5PXBaNVr7qtPumGyPR4Bt8hK/wWUR5chn6XJYoU5StUHL8l+XEx2axhkS6yk+chJuP4rXLyOkIKJkS0B67adcqfL/0Y4pixxSysK6V8Yl9Mz7i3272NRFlhzJsu24Z5l9E9Ahmwfrpoj7uw3fZtktsRZKjIXnndlLxin7+W8ZTBwPf6I+Tg9HwxK2Ob8citbCoBoaxBxMCvsFH+CqjHCtUvLzflKWUcpwB91gupG5f9/Rtx39ZZBtmWyJtphKzHTQW0diP36b4aJmcLj/zGaSkHJPb4SWFi/tOJd8bTqd9s48VBRh4RKeUX/vjgXg8cpyCmz05xkJylxSoa8M5RF0eJaVIIkGOsg2yTc3UgpD94psiWxEOqDNYoOIXuHnGwE5AXUTFi46FTnRw4l/dwEm7/pSxcYnCF/gE3zInh52RRJkVP7/MlKFQcgCbjifHTAQBfsb2qsgBO3e1Cpf3UXBej3nRJKKrxU/rcH/pKzz4vNIQuRJTEmZklbg6EL4SPsE3GQPzinmfhbJDGQolB+r8w58abs5y8DqRt4ABeptLRR7koY9NleybEYw/MPisvF/ayT1/SvDewcnIcG32wfiCAbEvoCZyGaGsitdyz6XdTctQJq6fcT5mloNfYvu5yFZkpEz+RT0UrFoqpxVBV+vQxIrkaPnrbqdvXs6hcjbU+Jq4Nvvwd/BFRNeq2npwWfkX95iyE9p6PM72P/MhCPANTBSKu5WITHcC074Y9CUTkYglKBgcV/aVtlM5Kpp/RHFjDdfka7MP/2wG6m72661QNigjlBXKTGBtsjWKNs5atCf44Uds3xc5YD8Wknd2BxWuGjCzIxLWQzlFj+IjU108OL7bafM5sm5DDdfka/8T+9AJXyTMpqFsUEYoK5SZ0NbjVlvX500Q4Ha2A+JuCcEvhVS8qp/8MzspHhMSfO7mVPaP35BMRp9JsCQldbX+hmvxNfnamzJfqVvtWnGZoGxQRigroYs6UbfvOGHn4ORVkTaIbEWwtqg3MNO+Zql0JGCdVuCayhDuG9uJB7vp+oR17FbZc+NauCauLWLmKkqXr6NsUEYoK6GtxwY6CXXnEs0n2faIHLCPhhR8bikFKwRN+xZddHWu5a7Ol9yCZ2ZwHKdOxufGNeKRqS/hmnLWW1VMmQSrl5oyEkqOPbZu02IJAsic9sU7B+5uF9cOmqUfeLOdOaAZYb/CA+M/Ic9NxUoYMNfD/PT84f7xB807EAnrrbgMUBZt1w1SEpCIqfjF1Om5EuQNth0iu1r8tPLP76LCpX2yWpHDk2dGH018p6brtD5hOHf04cR3okOTZ0lqPVAW3gVdlMhdrfsTW6drRhDgRrYJcbeKZQxTkenvegNt6YBQwrQvOxG+P3ZHEia9TuClS9Br1XKge8XnxLlxjelzZ/2w4tijDMxyoHIsVQg1zvYPcy7KeZx4jG2zyFakFJF7Whu1XT2QvhfJeryeVNdplYPo4Pi9hKd7VVxVC8O5cH4+N65hXgoKuGfEHmWAskjGxI49Ntu6XHOCAD9ie1PcLSepjDNY00fB8m6KpSyJx/jgg9LfJEfLK40818w+LXY5e5zKaMfKl+DcIlSCZp0cd3U59igDI4+WOa2LunvfvDoD9RrcNLqAjDy3yzfrtKqbAkggSDIZmSlYxzz9a8BaJ101zF2rh3BuSTJaCKGMDEGujHbedXch0X2ebbdEkkDC6a9cQoWVguS53P0JP5xcHY1W/tppD9KxgrdAw5QxnwPn4nOukrPeqkzBJb0m9oJltLtt3a07QYD1IkMAeS7/hw0BXMhzJwXJc/eV7kuiyIN8OOGuUhLP06JUeoxz4FxiZLRouTsDM9WO2OdBRtsIgrzHtk3kgH00JO+cTipc2S9jqyCaluf2xwcnfuB6LndHuEsSzdP4N/gtzoFzSZHRIsaQQiPmidyXgttsnW0YQYDvsh2ROGBPxkMqXjNA/qlCFsnZ8UdlX+kfk0pymlnMWH2JOBfz0sWI+C3OMS1dzPphhPVWHOPC5wdMzIUOzFFHb1lwB2ARF+ZOPt0gshWBPLe/wCRZlu6CIkSei/cE0fD4g2ZbVWceyxH5WPwGvzXrrSTJaDnG7oBoGS3qaCULggCPsv1W5IAd8tzLllJwvpx1WthMIfyg9OVotHy1WVQ4V37wsfgNfkuSZLQcW8Q4lruU/RVbRykrggDXiwwN3uQWnXTa1xMkz2W/on2lndNajpNtAGePw2/MOicBMlqs+8K7GBNbjrFgGe2iX0nUgiAvs+0S2YpgndaFPVRc3SdmVanZlfGjifOiw5PrT/oGvPpG/vDkEH4jZ70Vt86rl5rYimmdP41/s3Uzc4Isup9XNxwvz+0tyNAlONPrtO6hctR+QnluKqNt52O3pxvtClhvxTH0egtmEwbBMlrUxU21OFGtCHKYbavIATv3j90z26kIea4QZRtahfhIuT0anrjH7O3rpjNVHzPIaLG3Lh8Tj5TbRQihjlNyehxTwTLarbZOiiEIcBfbPnGhMtroChXW9JN/VqeYdyPEY4nwwPj6ZCL8C1T+T61JhDqRv8MxZgwlJG2BxzEsrBmgeEzseqt9ti6SNIIA8t6wm901eFDZ66d7M4UkQ56LVgTTvvtKaRqFqoTWymjxGb6LpUzrImYcuzaOIWKJmAptPWpaB2sd+V+yvSB1wB6s7qXgwiUyBpbJdBqFq6MjU18mKCKhRsTyEbx558/wnRmYJzLiV+DYBat6JQ/MX7B1UCxBAKHy3IQrH6W7MhY9MWkUMNAN948/8Mm35/jMDIKlpC3gmBWQtsAjifkE61b36kGQP7DdL7KrVZXnXiYpjYKZxj09Gh7f4kB4yIa/8ZmU1brIIYiYIXaJ3Nbjflv3xBME+DZbSVwIzfIIK89dJkSea18Ihu+XflD9yPztCJnW5Ri5VRntpNh8giVb5ygvBIHu9yaRrchYRO6fFU0CSTPQlDLte6zshx9O3g3D3yJajySd4EDaAsQMsRPaetxk61zty+YTCXRqjf9jO19cOLnyYV+p8QffpcreMXJ7BeRgh77Ds6SIYhGbMBgB2tld1DW0nGL4VxbZfKBbdUHdhol1dl7mOi0MOjttGgWT11lAwU9r1mMSsX0oxwSxgYyWOvKXtiAvBPkV239I7GqZdVqX9FDw2V5+UoYipn2nt/WRMK3LMQlW9poYCZ7WfcrWsdwSBNggMrRYdcLdhjas0+q28lzJOc8bOU7jWLh2AwzEyLxclYm6Z2ZuBEE+YLtTZEVA9tzPdBh5biJ3q5rGD8yRjXbNAPkcm0RuyjTUqf3NQBDge2yHJFaGeDyi4tUD5J3WIXmzs8Y9NDgG3un80OCYIDZCHxqHbJ2iZiEIGmnB8twgzYIkd7vMxiBON59GLJyBQLKMdiM1qOPXyMn2f2f7X5EDdshzkUbhAtED0oZMXCAGiIXgtAW/YXusURdr9NsoufLcgmP20zKy2ErrNSNGRuunMUAshL7zABq61q/RBPkd2yNSn57+X3ZTQZA8t7H3H5p7RwwEt6KP2DrUtAQBIIUsiwt99Kf+tydFntuocVhVRltNWyBTRlumGslopRNkhO1mkRVlLCT3jHYzqyU48WSN+1ZWRou0BZDRyp3Ju9nWnaYnCHA3216JlQWy0gKy557dJSaNQn0nKNL1VrhnwTLavbbOUKsQBBApzzVpFHqsPFdIGoW6AfeG7cMwrcv3TC0io80LQZ5me07kU3WkYqSlhYvkpFGoz8C8bO7RyGjlpi14ztaVliMIIFOeizQKbpI+WdsDGfLcWvcmsaK53b4gdUW3lENZXjxrgrzNdq/IAftohbzzOql4eV/zjUUcu96K7w33KFhGi7rxVisTBEBSxWPiiqYqz71mGfmDQuS5tSIHstHyPZnd7+XKaI+RgKSxEggySWmKaXkVaSwi5xSbRmGiSdZpxVZGy/eEexMso73R1o2WJwiwk+11kQNZrNO6oo+Cc7vz39Wy07q4l+CKfnNvQu/ndVsnSAkifcCOAXq7R8W1y9JdRvI87QvfnTRtgdPeujLavBLkv9meEPnUHS2Tf1EPFT67lOKRnE77munrsrkH/+IeydPXqAO/VoLMDMhz5T2irTzXpFHoKeRPnluV0XYX0mlduTLamIRJtKUR5CDbbSIrGPfX/eUdVFyTQ3luku6OaNIW/HmH5LQFt9k6oAQ5Ab7PNiyxkmGndUhRvTNyJM9F1wrZaM9IZbQmG63MocewxIejRIKg+DaKbEXGI3KWBtT2hUFKyonUZeEfB3xkX4vsM3wXvIx/IwmMqCu0WH/B9qLIpzG6Wp/rpWBFj/x1WnaCAb4G7LPgad0XbZmTEmTukDnti0yzgZvKcwNPtDzXyGjZR5ONFincVEbbVAR5je0hkU/lkTL5F3TZzQ2EvjysJr1hH/0LuiVPTz9ky1oJsgB8iwQsN5hplISns5Hn9hXl9eurMlr2zUzrVsQuk5m0ZUxKkIXhKNsWkQN2yHNPhzx3WbqQMRZGYCOjXWZ8FDzjtsWWsRJkEfgh2zvyOvhWnovsucu75GTPtdlo4RN8i+W+s3nHli0pQRaPIXEeVeW53V46YJciz2Uf4IvxiX0juW/9h/JQ8fJCkGfZnpE5YK9QsHIJBZcIkOdW141d3Gt8EiyjfcaWqRKk6Z84kOc6duODjmzluUZGyz4g6Q18UhltaxHkXbbtIgfsRyvknQt5bobZc6dltP3Gl0SudmW7LUslSJ1mPUbFeWVUepDnDpB3SgazRtW0BXxt+ABfhE7rypyVbCKCTLF9U2QrgjQKg3b7zskGv3eI0+XsuDZ8EJy2YJMtQyVIHfEztldFDtghz728j4LzGphGoZq2gK9ZMDuwiH3ngTJ7OG+VLY8EAeTKc9ts9lwk42zEOi2st+JrYZIA1xYso12Xx4qWV4K8xPZzka3ISCrPDVY1YJ1WtfVYZWW0ctdbPW7LTAnSQHyDJCoykEYhTNdpuUsK6YDZqQ85cG5cw6y3CsWmLYBXG/NayfJMkI8oVR/KG7AfC8k7u4MKVw2kM1r1eB2RpDNXuAauJVhGe6stKyVIBrid7YA4r6o5N5BG4cxOI3mtaeWtymj53LiG4FwmKJs78lzB8k4QVIsN4ryqynN7AzP1ShXIc2tYg3GuSpJO6/aKltHK3KWmhQgCPMm2R+SAfTSkANlzV9Rw2rc6MDcyWtHZaPfYsiElSPaQOYVYiSnxiIprB8kpeGn+v8U2mZD8FjxzTpybKjqtqwQ5Od5g2yGyq4Xsued3UeHSvsW3IlUZLZ8L5xSctmCHLRMliCBgN/AJcV7F6SpbjBe8gUWkUaimLeBzmOUsU2JltOMkcbd+JQiNkYB8ErNVbPe0Nmq72i4kXMiwNUnfe+AcOJfgfCWbbVkoQQTiR2xvivPKynODNX0ULF9AGoVq2gL+Lc4hWEaL2N/XTBWq2Qgic3BYled2+ekeVfOV51az0WKNF59DsIx2XbNVpmYkyPNsuyWSBBJYf+USKsxHnlvNRsu/8WXLaHfb2CtBcoD1Ir2CPJf/wxSt2xmkupGT9c6QtoCPNdO66FfJldGub8aK1KwEeY9tm8gB+2hI3jmdVLii/+RbBdktfHAsfpPIfSm4zcZcCZIjfJftiMQBO1IQQBrrn3qCRYZ20SOOMTLacbHrrRDjW5q1EjUzQbiTTzeIbEUgz+232XNne59RfX+CbLT9omW0iHFFCZJPPMr2W5EDdshzL1tKwfkzrNOqrrfi73CMYBntKzbGpATJL64X6RXWZRVtxlnP+VgaBZO2wEu/wzGatkAJUk+8zLZLZCuCdVoXciux+rhVuXYVMD7Dd7Hc9Va7bGyVIE0Amf3kaXnuIHm9qTwXhr/xmWAZbUXk+E4JsmAcZtsqcsAOee6Z7VS08lwY/sZngmW0W21MlSBNhLvY9onzCqtIxipUuKqf3L6iMfyNz4RO6+6zsWwJ+NRawNvep8S1IhMxucie+8VT0o+6PIqPiB17rG+lCtNqBPkl2wts14gbsCONwqVLzT8Fr7d6wcawZeBS60Hm1GSSTu+a6d5EY6cEyQ5/YLtf4oCd4iQ1ma3H/TZ2SpAWwLfZSqSYK0o2ZqQEaQ1AN32T1vs54yYbMyVIC+GBVuwyLLBL+kCr3rzb4oV/vdZ/jZESZHb8iqS9F5GFp2yMlCAtjCENgcZGCTI79rPdqWH4FO60sVGCKOh7bIc0DNM4ZGNCShAFEFKOsyDVARttTJQgGoJpPMb2Gw2DicFjGgYlyExYpyHQGChBZsfv2B5p4ft/xMZAoQSZFZso3TKo1VC2965QgpwQI2w3t+B932zvXaEEOSnuZtvbQve7196zQgkyZ6zXe1UoQWbH02zPtcB9PmfvVaEEmTeG9B6VIIrZ8RbbvU18f/fae1QoQRYMJKU81oT3dYwkJj1VguQOk9REaY2Pw4323hRKkEVjJ9vrTXQ/r9t7UihBaobr9V6UIIrZ8Wu2J5rgPp6w96JQgtQcG2jmhGl5QWzvQaEEqQsOst2WY/9vs/egUILUtZIN59Dv4ZyTWwmSEyDnUx7luRtJar4qJUjT4RdsL+bI3xetzwolSMOwTn1Vgihmx2tsD+XAz4esrwolSMPxLZK9XGPS+qhQgmSCo2xbBPu3xfqoUIJkhh+yvSPQr3esbwolSOYYUp+UIIrZ8SzbM4L8ecb6pFCC6BNbWw8lSB7wLtt2AX5st74olCDikPWskfRZNSVIi2OKst2+c5P1QaEEEYuH2V7N4Lqv2msrlCDisa5FrqkEUSwIL7E93sDrPW6vqVCC5AaN0l/kVZ+iBGlxfMR2awOuc6u9lkIJkjvcwXagjuc/YK+hUILkEgnVdxeRDfYaCiVIbvEk2546nHePPbdCCZJ7rMvJORVKkEzwBtuOGp5vhz2nQgnSNMBu6uM1OM84Nedu80qQFscY1SYfx2Z7LoUSpOlwH9ubi/j9m/YcCiWIDth1YK4EaUU8z7Z7Ab/bbX+rUII0PdY36DcKJUgu8R7btnkcv83+RqEEaRncwnZkDscdsccqlCAthQrbDXM47gZ7rEIJ0nJ4lO2VE3z/ij1GoQRpWaxb4HcKJUhL4GW2XTN8vst+p1CCtDw+Oc6Y6/hEoQRpCRxm23rcv7fazxRKEIXFXZRuwBDZvxUC4GsIREHflguDkyQqaVYotIulUChBFAoliEKhBFEolCAKhRJEoVCCKBRKEIVCCaJQKJQgCoUSRKFQgigUShCFIhP8vwADACog5YM65zugAAAAAElFTkSuQmCC";const s=(0,a._)("img",{alt:"Logo",src:i,class:"logo"},null,-1),c=(0,a.Uk)(" | "),l=(0,a.Uk)(" | ");function u(t,e,n,o,i,u){const h=(0,a.up)("router-link"),d=(0,a.up)("LocaleSwitcher"),m=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("nav",null,[(0,a.Wm)(h,{to:"/"},{default:(0,a.w5)((()=>[s])),_:1}),(0,a.Wm)(h,{to:"/"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,r.zw)(t.t("home.title")),1)])),_:1}),c,(0,a.Wm)(h,{to:"/games"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,r.zw)(t.t("games.title")),1)])),_:1}),l,(0,a.Wm)(h,{to:"/about"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,r.zw)(t.t("about.title")),1)])),_:1}),(0,a.Wm)(d)]),(0,a.Wm)(m)],64)}var h=n(4329);const d={class:"locale-switcher"};function m(t,e,n,o,i,s){return(0,a.wg)(),(0,a.iD)("div",d,[(0,a._)("button",{class:(0,r.C_)(t.currentLocale),onClick:e[0]||(e[0]=(...e)=>t.switchLocale&&t.switchLocale(...e))},[(0,a._)("span",null,(0,r.zw)(t.currentLocale.toUpperCase()),1)],2)])}var g=(0,a.aZ)({name:"LocaleSwitcher",setup(){const{t:t}=(0,h.QT)({inheritLocale:!0,useScope:"local"});return{t:t}},data(){return{currentLocale:""}},mounted(){try{this.currentLocale="fr"===this.$i18n.global.locale._value?"fr":"en"}catch{this.currentLocale="fr"===navigator.language?"en":"fr"}},methods:{setLocale(t){localStorage.setItem("locale",t),this.$i18n.global.locale._setter(t),this.$i18n.global.locale._value=t,this.currentLocale=t},switchLocale(){"en"===this.currentLocale?this.setLocale("fr"):this.setLocale("en")}}}),f=n(89);const b=(0,f.Z)(g,[["render",m],["__scopeId","data-v-150e7c7e"]]);var w=b,p=(0,a.aZ)({setup(){const{t:t}=(0,h.QT)({inheritLocale:!0,useScope:"global"});return{t:t}},components:{LocaleSwitcher:w}});const y=(0,f.Z)(p,[["render",u]]);var k=y;let I=localStorage.getItem("locale");function z(){const t=n(8973),e={};return t.keys().forEach((n=>{const o=n.match(/([A-Za-z0-9-_]+)\./i);if(o&&o.length>1){const a=o[1];e[a]=t(n).default}})),e}"fr"!==I&&"en"!==I&&(I="fr"===navigator.language?"fr":"en"),localStorage.setItem("locale",I);var v=(0,h.o)({legacy:!1,locale:I||"en",fallbackLocale:"en",messages:z()}),C=n(2483);const R={class:"home"};function Z(t,e,n,o,i,s){return(0,a.wg)(),(0,a.iD)("div",R,[(0,a._)("h1",null,(0,r.zw)(t.t("home.welcome")),1)])}var W=(0,a.aZ)({name:"HomeView",setup(){const{t:t}=(0,h.QT)({inheritLocale:!0,useScope:"local"});return{t:t}}});const N=(0,f.Z)(W,[["render",Z]]);var E=N;const O={class:"about"},U=(0,a._)("h1",null,"This is an about page",-1),Q=[U];function S(t,e,n,o,r,i){return(0,a.wg)(),(0,a.iD)("div",O,Q)}var G=(0,a.aZ)({name:"AboutView",setup(){const{t:t}=(0,h.QT)({inheritLocale:!0,useScope:"local"});return{t:t}}});const V=(0,f.Z)(G,[["render",S]]);var B=V;const L={class:"about"};function x(t,e,n,i,s,c){const l=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("div",L,[(0,a._)("h1",null,(0,r.zw)(t.t("games.title")),1),(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":e[0]||(e[0]=e=>t.text=e),onKeyup:e[1]||(e[1]=(0,o.D2)((e=>t.searchInputHandler()),["enter"]))},null,544),[[o.nr,t.text]]),(0,a._)("ul",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.games,((t,e)=>((0,a.wg)(),(0,a.iD)("li",{key:e},[(0,a.Wm)(l,{to:`/games/${t.id}`},{default:(0,a.w5)((()=>[(0,a.Uk)((0,r.zw)(t.name),1)])),_:2},1032,["to"])])))),128))])])}var P=n(6925),A=(0,a.aZ)({name:"AboutView",setup(){const{t:t}=(0,h.QT)({inheritLocale:!0,useScope:"local"});return{t:t}},data(){return{games:[],database:new P,text:""}},mounted(){this.database.load(),this.search()},methods:{async search(t){let e=await this.database.getDatabase(),n={};if(t)for(let o=0;o<Object.keys(e).length;o++){let a=e[Object.keys(e)[o]];for(let r=0;r<Object.keys(a).length;r++){let i=a[Object.keys(a)[r]];if(i.toLowerCase().indexOf(t.toLowerCase())>-1){n[Object.keys(e)[o]]=a;break}}}else n=e;this.games=n,console.log(this.games)},searchInputHandler(){this.search(this.text)}}});const Y=(0,f.Z)(A,[["render",x]]);var J=Y;const D={class:"about"},j={href:"javascript:history.go(-1)"},M=(0,a.Uk)(". ");function T(t,e,n,o,i,s){const c=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("div",D,[(0,a._)("h1",null,(0,r.zw)(t.t("404.message")),1),(0,a._)("p",null,[(0,a.Uk)((0,r.zw)(t.t("404.you-may-want-to"))+" ",1),(0,a._)("a",j,(0,r.zw)(t.t("404.go-back")),1),(0,a.Uk)(" "+(0,r.zw)(t.t("404.or-to-the"))+" ",1),(0,a.Wm)(c,{to:"/"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,r.zw)(t.t("404.home-page")),1)])),_:1}),M])])}var K=(0,a.aZ)({name:"NotFoundView",setup(){const{t:t}=(0,h.QT)({inheritLocale:!0,useScope:"local"});return{t:t}}});const X=(0,f.Z)(K,[["render",T]]);var H=X;const F=[{path:"/",name:"home",component:E,meta:{title:"Home"}},{path:"/about",name:"about",component:B,meta:{title:"About"}},{path:"/games",name:"games",component:J,meta:{title:"Games"}},{path:"/:pathMatch(.*)*",name:"not-found",component:H,meta:{title:"Not Found"}}],q=(0,C.p7)({history:(0,C.PO)("/Cludo-Client/"),routes:F});q.beforeEach(((t,e,n)=>{t.meta.title?document.title=t.meta.title+" - Cludo":document.title="Cludo",n()}));var _=q;const $=(0,o.ri)(k);$.config.globalProperties.$i18n=v,$.use(_),$.use(v),$.mount("#app")},8973:function(t,e,n){var o={"./en.json":3482,"./fr.json":5627};function a(t){var e=r(t);return n(e)}function r(t){if(!n.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}a.keys=function(){return Object.keys(o)},a.resolve=r,t.exports=a,a.id=8973}},e={};function n(o){var a=e[o];if(void 0!==a)return a.exports;var r=e[o]={exports:{}};return t[o](r,r.exports,n),r.exports}n.m=t,function(){var t=[];n.O=function(e,o,a,r){if(!o){var i=1/0;for(u=0;u<t.length;u++){o=t[u][0],a=t[u][1],r=t[u][2];for(var s=!0,c=0;c<o.length;c++)(!1&r||i>=r)&&Object.keys(n.O).every((function(t){return n.O[t](o[c])}))?o.splice(c--,1):(s=!1,r<i&&(i=r));if(s){t.splice(u--,1);var l=a();void 0!==l&&(e=l)}}return e}r=r||0;for(var u=t.length;u>0&&t[u-1][2]>r;u--)t[u]=t[u-1];t[u]=[o,a,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var a,r,i=o[0],s=o[1],c=o[2],l=0;if(i.some((function(e){return 0!==t[e]}))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(c)var u=c(n)}for(e&&e(o);l<i.length;l++)r=i[l],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(u)},o=self["webpackChunkcludo_client"]=self["webpackChunkcludo_client"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(1780)}));o=n.O(o)})();
//# sourceMappingURL=app.beaa3e7d.js.map