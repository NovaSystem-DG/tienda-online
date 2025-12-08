 const modal = document.getElementById('modal');
    const modalCard = document.getElementById('modal-card');
    const cart = [];

    function scrollToCatalog(){
      document.getElementById('productos').scrollIntoView({behavior:'smooth'});
    }

    function openModal(key){
      let html = '';
      if(key === 'suscribete'){
        html = `<h2>Suscríbete</h2>
          <p>Recibe ofertas y novedades directas a tu correo.</p>
          <form onsubmit="event.preventDefault(); alert('Gracias!'); closeModal();">
            <input required placeholder="Tu correo" style="padding:10px;border-radius:10px;border:1px solid #eee;width:100%;margin-top:8px" />
            <div style="display:flex;gap:8px;margin-top:12px;justify-content:flex-end">
              <button class="btn btn-secondary" type="button" onclick="closeModal()">Cerrar</button>
              <button class="btn btn-primary" type="submit">Enviar</button>
            </div>
          </form>`;
      } else if(key === 'cart'){
        if(cart.length === 0) html = `<h2>Tu carrito está vacío</h2><p>Añade productos para empezar a brillar ✨</p><div style="margin-top:12px;text-align:right"><button class='btn btn-primary' onclick='closeModal()'>Seguir comprando</button></div>`;
        else {
          html = '<h2>Carrito</h2><div>' + cart.map((it, idx)=>`<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f1e6fb"><div><b>${it.name}</b><div style="font-size:13px;color:#5a3a73">Cantidad: ${it.qty}</div></div><div style="font-weight:800">$'+it.price+'</div></div>`).join('') + '</div><div style="display:flex;justify-content:space-between;margin-top:12px;font-weight:800"><div>Total</div><div>$'+cart.reduce((s,i)=>s+i.price*i.qty,0)+'</div></div><div style="margin-top:12px;text-align:right"><button class="btn btn-secondary" onclick="closeModal()">Seguir comprando</button> <button class="btn btn-primary" onclick="checkout()">Pagar</button></div>';
        }
      } else if(key.startsWith('p')){
        // demo product pages
        const id = key.replace('p','');
        const products = {
          '1':{name:'Shampoo Violeta Revive',price:29900,desc:'Limpieza profunda y brillo sin resecar.'},
          '2':{name:'Mascarilla Rosa Nutre',price:34900,desc:'Mascarilla hidratante de 10 minutos.'},
          '3':{name:'Serum Iluminador',price:44900,desc:'Gotas concentradas para un brillo sutil.'}
        };
        const p = products[id];
        html = `<div style="display:flex;gap:16px;align-items:center"><div style="flex:1"><h2>${p.name}</h2><p style='color:#5a3a73'>${p.desc}</p><div style='margin-top:12px;font-weight:900'>$${p.price}</div><div style='margin-top:12px;display:flex;gap:8px'><button class='btn btn-primary' onclick="addToCart(${id})">Agregar</button><button class='btn' onclick="closeModal()">Cerrar</button></div></div><div style='width:210px;height:210px;border-radius:12px;background:linear-gradient(135deg,var(--pink-1),var(--purple-1));display:grid;place-items:center;font-size:44px;color:white'>✨</div></div>`;
      }
      modalCard.innerHTML = html;
      modal.classList.add('open');
    }

    function closeModal(){
      modal.classList.remove('open');
      modalCard.innerHTML = '';
    }

    modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

    function addToCart(id){
      const map = {1:{name:'Shampoo Violeta Revive',price:29900},2:{name:'Mascarilla Rosa Nutre',price:34900},3:{name:'Serum Iluminador',price:44900}};
      const item = map[id];
      const found = cart.find(x=>x.name===item.name);
      if(found) found.qty++;
      else cart.push({name:item.name,price:item.price,qty:1});
      document.getElementById('cart-count').innerText = cart.reduce((s,i)=>s+i.qty,0);
      // small feedback
      const fab = document.querySelector('.cart-fab');
      fab.animate([{transform:'translateY(0)'},{transform:'translateY(-8px)'},{transform:'translateY(0)'}],{duration:420});
    }

    function checkout(){
      alert('Gracias por tu compra — este es un demo.');
      cart.length = 0;document.getElementById('cart-count').innerText = 0;closeModal();
    }