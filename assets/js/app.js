// Common app utilities: injects navbar and provides simple data store
(function(){
  const navHtml = `
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <a class="navbar-brand" href="/">Tax Mozo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
          <li class="nav-item"><a class="nav-link" href="purchases.html">Purchases</a></li>
          <li class="nav-item"><a class="nav-link" href="tracker.html">Profile Tracker</a></li>
          <li class="nav-item"><a class="nav-link" href="dashboard.html">Dashboard</a></li>
          <li class="nav-item" id="userEmailBadge"></li>
          <li class="nav-item"><a class="btn btn-outline-secondary ms-3" href="login.html">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>`;

  const adminNavHtml = `
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <a class="navbar-brand" href="/">Tax Mozo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="../adim/services.html">Services</a></li>
          <li class="nav-item"><a class="nav-link" href="../adim/orders.html">Orders</a></li>
          <li class="nav-item"><a class="nav-link" href="../adim/revenue.html">Revenue</a></li>
          <li class="nav-item"><a class="nav-link" href="../adim/dashboard.html">Dashboard</a></li>
          <li class="nav-item" id="userEmailBadge"></li>
        </ul>
      </div>
    </div>
  </nav>`;

  function injectNav(){
    const root = document.getElementById('top-nav');
    if(!root) return;
    // if page has data-role="admin" attribute on html, render admin nav
    const isAdmin = document.documentElement.getAttribute('data-role') === 'admin' || location.pathname.includes('/adim/');
    root.innerHTML = isAdmin ? adminNavHtml : navHtml;
  }

  const serviceCategories = [
    'Entity Registrations',
    'Licenses & Registrations',
    'Income Tax Return',
    'Annual Compliances',
    'Subsidy / Funding'
  ];

  const defaultServices = [
    {id:1,title:'Public Limited Registration',desc:'Entity Registrations - Company incorporation service',price:14999,category:'Entity Registrations'},
    {id:2,title:'Private Limited Company Registration',desc:'Entity Registrations - Private limited company formation service',price:9999,category:'Entity Registrations'},
    {id:3,title:'One Person Company (OPC) Registration',desc:'Entity Registrations - Single promoter company registration',price:8999,category:'Entity Registrations'},
    {id:4,title:'Limited Liability Partnership (LLP) Registration',desc:'Entity Registrations - LLP incorporation service',price:7499,category:'Entity Registrations'},
    {id:5,title:'Section 8 Company (NGO) Registration',desc:'Entity Registrations - Section 8 company registration',price:12999,category:'Entity Registrations'},
    {id:6,title:'Nidhi Company Registration',desc:'Entity Registrations - Nidhi company incorporation and regulatory support',price:13999,category:'Entity Registrations'},
    {id:7,title:'Partnership Firm Registration',desc:'Entity Registrations - Partnership firm setup and documentation',price:4999,category:'Entity Registrations'},
    {id:8,title:'Sole Proprietorship Registration',desc:'Entity Registrations - Proprietorship business registration',price:3999,category:'Entity Registrations'},
    {id:9,title:'Startup Company Registration',desc:'Entity Registrations - Startup identification and company registration',price:10999,category:'Entity Registrations'},
    {id:10,title:'Farmer Producer Company (FPO) Registration',desc:'Entity Registrations - FPO incorporation and registration',price:11999,category:'Entity Registrations'},
    {id:11,title:'GST Registration',desc:'Licenses & Registrations - GST registration for businesses',price:2499,category:'Licenses & Registrations'},
    {id:12,title:'FSSAI License Registration',desc:'Licenses & Registrations - Food business license registration',price:4999,category:'Licenses & Registrations'},
    {id:13,title:'Import Export Code (IEC) Registration',desc:'Licenses & Registrations - IEC registration for exporters',price:3999,category:'Licenses & Registrations'},
    {id:14,title:'Trade License Registration',desc:'Licenses & Registrations - Local trade license application support',price:2999,category:'Licenses & Registrations'},
    {id:15,title:'MSME Registration',desc:'Licenses & Registrations - MSME registration and benefits support',price:1999,category:'Licenses & Registrations'},
    {id:16,title:'Shops and Establishment License',desc:'Licenses & Registrations - Shops and establishment registration',price:3499,category:'Licenses & Registrations'},
    {id:17,title:'Individual Income Tax Return (ITR-1)',desc:'Income Tax Return - Tax filing for salaried individuals',price:1999,category:'Income Tax Return'},
    {id:18,title:'Business Income Tax Return (ITR-3)',desc:'Income Tax Return - Tax filing for businesses and professionals',price:3999,category:'Income Tax Return'},
    {id:19,title:'Corporate Income Tax Return (ITR-6)',desc:'Income Tax Return - Tax filing for companies',price:4999,category:'Income Tax Return'},
    {id:20,title:'NRI Income Tax Return',desc:'Income Tax Return - Income tax filing for non-resident Indians',price:4499,category:'Income Tax Return'},
    {id:21,title:'Revised Income Tax Return',desc:'Income Tax Return - Revised filing support for corrections',price:2999,category:'Income Tax Return'},
    {id:22,title:'Annual ROC Filing',desc:'Annual Compliances - Annual filing for companies with ROC',price:6999,category:'Annual Compliances'},
    {id:23,title:'GST Annual Return Filing',desc:'Annual Compliances - Annual GST return filing support',price:3999,category:'Annual Compliances'},
    {id:24,title:'TDS Return Filing',desc:'Annual Compliances - Quarterly and annual TDS return filing',price:2999,category:'Annual Compliances'},
    {id:25,title:'LLP Annual Compliance',desc:'Annual Compliances - Annual compliance filing for LLPs',price:4999,category:'Annual Compliances'},
    {id:26,title:'Company Annual General Meeting Support',desc:'Annual Compliances - AGM and minutes support for companies',price:3499,category:'Annual Compliances'},
    {id:27,title:'Subsidy Application Support',desc:'Subsidy / Funding - Government subsidy and grant application support',price:4999,category:'Subsidy / Funding'},
    {id:28,title:'MSME Funding Assistance',desc:'Subsidy / Funding - Assistance for MSME funding schemes',price:6999,category:'Subsidy / Funding'},
    {id:29,title:'Startup Funding Registration',desc:'Subsidy / Funding - Startup funding and incentive registration support',price:7999,category:'Subsidy / Funding'},
    {id:30,title:'Export Promotion Subsidy Support',desc:'Subsidy / Funding - Export subsidy application and compliance support',price:5999,category:'Subsidy / Funding'},
    {id:31,title:'Grant Application Assistance',desc:'Subsidy / Funding - Grant application and documentation support',price:5499,category:'Subsidy / Funding'}
  ];

  function mergeServices(existing){
    const defaultMap = new Map(defaultServices.map(s => [s.id, s]));
    existing.forEach(item => {
      if (!defaultMap.has(item.id)) {
        defaultMap.set(item.id, item);
      } else {
        const base = defaultMap.get(item.id);
        defaultMap.set(item.id, {...base, ...item});
      }
    });
    return Array.from(defaultMap.values()).sort((a,b)=>a.id-b.id);
  }

  function getServices(){
    const d = localStorage.getItem('tp_services');
    if(d){
      const existing = JSON.parse(d);
      const merged = mergeServices(existing);
      if(merged.length !== defaultServices.length) {
        localStorage.setItem('tp_services', JSON.stringify(merged));
      }
      return merged;
    }
    localStorage.setItem('tp_services',JSON.stringify(defaultServices));
    return defaultServices;
  }

  function getPurchases(){
    const d = localStorage.getItem('tp_purchases');
    return d ? JSON.parse(d) : [];
  }

  function savePurchase(p){
    const arr = getPurchases();
    arr.unshift(p);
    localStorage.setItem('tp_purchases', JSON.stringify(arr));
  }

  function renderServicesList(){
    const el = document.getElementById('servicesList');
    const elAdmin = document.getElementById('servicesListAdmin');
    const filterSelect = document.getElementById('serviceCategoryFilter');
    const services = getServices();
    
    // Populate filter dropdown
    if(filterSelect){
      filterSelect.innerHTML = '<option value="all">All categories</option>' + 
        serviceCategories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
      filterSelect.addEventListener('change', (e) => {
        renderServicesList();
      });
    }

    const selectedCategory = filterSelect ? filterSelect.value : 'all';
    
    const grouped = serviceCategories.map(category => ({
      category,
      items: services.filter(s => s.category === category)
    })).filter(group => selectedCategory === 'all' || group.category === selectedCategory);

    const buildSection = (items)=>items.map(s=>`
      <div class="col-md-3">
        <div class="card p-3 service-card h-100">
          <small class="text-muted">${s.category}</small>
          <h5 class="mt-2">${s.title}</h5>
          <p class="text-muted small">${s.desc}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <div class="service-price">INR ${s.price}.00</div>
            <button class="btn btn-sm btn-success" data-id="${s.id}">View details</button>
          </div>
        </div>
      </div>
    `).join('');

    const html = grouped.map(group => {
      const sectionContent = group.items.length ? buildSection(group.items) : `<div class="col-12"><div class="card p-3 service-card text-center text-muted">No services currently listed under ${group.category}.</div></div>`;
      return `
      <div class="col-12">
        <h5 class="mt-4 mb-3">${group.category}</h5>
        <div class="row g-4">${sectionContent}</div>
      </div>
    `;
    }).join('');

    if(el) el.innerHTML = html;
    if(elAdmin) elAdmin.innerHTML = html;
    // attach listeners for purchase
    setTimeout(()=>{
      document.querySelectorAll('[data-id]').forEach(btn=>{
        btn.addEventListener('click', ()=>{ const id = +btn.getAttribute('data-id'); handlePurchase(id);});
      });
    },50);
  }

  function handlePurchase(id){
    const services = getServices();
    const s = services.find(x=>x.id===id);
    if(!s) return alert('Service not found');
    // Redirect to payment page instead of purchasing directly
    window.location.href = 'payment.html?id=' + id;
  }

  function renderPurchasesTable(){
    const el = document.getElementById('purchasesTable') || document.getElementById('dashboardPurchases') || document.getElementById('adminOrders');
    if(!el) return;
    const arr = getPurchases();
    const baseTracker = location.pathname.includes('/adim/') ? '../tracker.html' : 'tracker.html';
    el.innerHTML = arr.map(p=>{
      const date = new Date(p.purchasedAt).toLocaleString();
      const action = `<a class="btn btn-sm btn-outline-primary" href="${baseTracker}?id=${p.id}">View Tracker</a>`;
      return `<tr><td>${p.id}</td><td>${p.serviceTitle}</td><td>INR ${p.amount}.00</td><td>${p.status}</td><td>${action}</td></tr>`;
    }).join('');
  }

  function renderTrackerList(){
    const el = document.getElementById('trackerList');
    if(!el) return;
    const arr = getPurchases();
    el.innerHTML = arr.map(p=>`<tr><td>${p.id}</td><td>${p.serviceTitle}</td><td>INR ${p.amount}.00</td><td>${p.status}</td><td><a class="btn btn-sm btn-outline-primary" href="tracker.html?id=${p.id}">View Tracker</a></td></tr>`).join('');
  }

  function renderTrackerDetail(){
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const timelineEl = document.getElementById('timeline');
    if(!id || !timelineEl) return;
    const arr = getPurchases();
    const p = arr.find(x=>String(x.id)===String(id));
    if(!p){ timelineEl.innerHTML = '<p class="text-muted">Purchase not found</p>'; return; }
    const steps = ['Created','Initiated','Payment Success','Completed'];
    const now = new Date(p.purchasedAt).toLocaleString();
    timelineEl.innerHTML = steps.map((s,i)=>`<div class="timeline-step ${i<=2? 'done':''}"><strong>${s}</strong><div class="small text-muted">${i===0? 'Purchase created successfully': i===1? 'Payment initiated': i===2? 'Payment confirmed': 'Completed'}</div></div>`).join('');
  }

  function renderProfile(){
    const el = document.getElementById('profileInfo');
    const badgeEl = document.getElementById('userEmailBadge');
    const user = JSON.parse(localStorage.getItem('tp_currentUser') || '{}');
    
    if(el){
      if(user.name && user.email){
        el.innerHTML = `<p><strong>Name:</strong> ${user.name}</p><p><strong>Email:</strong> ${user.email}</p>`;
      } else {
        el.innerHTML = `<p class="text-muted">Please <a href="login.html">log in</a> to view your profile.</p>`;
      }
    }
    
    if(badgeEl){
      if(user.email){
        badgeEl.innerHTML = `<span class="ms-3 top-email d-none d-lg-block" id="topEmail">${user.email}</span>`;
      }
    }
  }

  function renderAdminStats(){
    const users = JSON.parse(localStorage.getItem('tp_users')||'[]');
    const purchases = getPurchases();
    const totalUsers = users.length;
    const revenue = purchases.reduce((s,p)=>s + (p.amount||0),0);
    const recent = purchases.slice(0,5);
    const tu = document.getElementById('totalUsers'); if(tu) tu.textContent = totalUsers;
    const tr = document.getElementById('totalRevenue'); if(tr) tr.textContent = `INR ${revenue}.00`;
    const rp = document.getElementById('recentPurchases'); if(rp) rp.innerHTML = recent.map(r=>`<li>${r.serviceTitle} - INR ${r.amount}.00</li>`).join('');
    const rev = document.getElementById('revenueTotal'); if(rev) rev.textContent = `INR ${revenue}.00`;
  }

  // initialize on DOM ready
  document.addEventListener('DOMContentLoaded', ()=>{
    injectNav();
    renderServicesList();
    renderPurchasesTable();
    renderTrackerList();
    renderTrackerDetail();
    renderProfile();
    renderAdminStats();
  });

  // expose for debugging
  window.tp = {getServices, getPurchases, savePurchase};

})();
