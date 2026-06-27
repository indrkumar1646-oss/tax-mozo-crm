// small admin / dashboard helpers
document.addEventListener('DOMContentLoaded', ()=>{
  // populate dashboard purchases table with demo data if empty
  const dashTable = document.getElementById('dashboardPurchases');
  if(dashTable){
    const purchases = JSON.parse(localStorage.getItem('tp_purchases')||'[]');
    if(purchases.length===0){
      // seed a few demo purchases
      const services = JSON.parse(localStorage.getItem('tp_services')||'[]');
      const seed = [services[4], services[2], services[1]].map(s=>({id:Date.now()+Math.random(), serviceId:s.id, serviceTitle:s.title, amount:s.price, status:'SUCCESS', purchasedAt:new Date().toISOString()}));
      localStorage.setItem('tp_purchases', JSON.stringify(seed));
    }
    // let app.js render them on its own
  }
});
