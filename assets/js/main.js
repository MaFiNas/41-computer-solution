(function(){
  var toggle=document.getElementById('navToggle');
  var nav=document.getElementById('siteNav');
  if(toggle && nav){
    toggle.addEventListener('click',function(){
      nav.classList.toggle('open');
      var isOpen=nav.classList.contains('open');
      toggle.textContent=isOpen?'✕':'☰';
      toggle.setAttribute('aria-expanded',isOpen?'true':'false');
    });
    nav.addEventListener('click',function(){
      nav.classList.remove('open');
      toggle.textContent='☰';
    });
  }












  document.querySelectorAll('[data-copy]').forEach(function(button){
    button.addEventListener('click',function(){
      var value=button.getAttribute('data-copy');
      navigator.clipboard.writeText(value).then(function(){
        if(typeof showToast==='function'){showToast('Nomor WhatsApp disalin.');}
      }).catch(function(){});
    });
  });


  var printServices=document.getElementById('printServices');
  if(printServices){printServices.addEventListener('click',function(){window.print();});}



  var noPostsClean=document.getElementById('noPostsClean');
  var hasPost=document.querySelector('.post-outer,.post,.blog-posts .date-outer');
  if(hasPost){
    if(noPostsClean){noPostsClean.style.display='none';}
  }else{
    document.body.classList.add('homepage-no-posts');
  }
  var currentUrl=window.location.href;
  var currentTitle=document.title;
  var copyCurrentUrl=document.getElementById('copyCurrentUrl');
  var shareWhatsApp=document.getElementById('shareWhatsApp');
  var shareFacebook=document.getElementById('shareFacebook');
  var shareTelegram=document.getElementById('shareTelegram');
  if(copyCurrentUrl){
    copyCurrentUrl.addEventListener('click',function(){
      navigator.clipboard.writeText(currentUrl).then(function(){
        if(typeof showToast==='function'){showToast('Tautan berhasil disalin.');}
      }).catch(function(){});
    });
  }
  if(shareWhatsApp){shareWhatsApp.href='https://wa.me/?text='+encodeURIComponent(currentTitle+' '+currentUrl);}
  if(shareFacebook){shareFacebook.href='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(currentUrl);}
  if(shareTelegram){shareTelegram.href='https://t.me/share/url?url='+encodeURIComponent(currentUrl)+'&text='+encodeURIComponent(currentTitle);}

  var sharePage=document.getElementById('sharePage');
  if(sharePage){
    sharePage.addEventListener('click',function(){
      if(navigator.share){
        navigator.share({title:document.title,url:window.location.href}).catch(function(){});
      }else{
        navigator.clipboard.writeText(window.location.href).then(function(){
          if(typeof showToast==='function'){showToast('Tautan berhasil disalin.');}
        }).catch(function(){});
      }
    });
  }





  function getServiceOpenState(){
    var now=new Date();
    var day=now.getDay();
    var hour=now.getHours();
    return day>=1 && day<=6 && hour>=9 && hour<18;
  }
  function updateOpenStatus(){
    var open=getServiceOpenState();
    var status=document.getElementById('openStatus');
    if(status){
      status.textContent=open?'Sedang buka':'Sedang tutup';
      status.classList.toggle('closed',!open);
    }
    if(waLiveStatus){
      waLiveStatus.textContent=open?'Online — biasanya membalas lebih cepat':'Di luar jam layanan — pesan tetap dapat dikirim';
      waLiveStatus.style.color=open?'#16a34a':'#ea580c';
    }
  }

  var waLive=document.getElementById('waLive');
  var waLiveClose=document.getElementById('waLiveClose');
  var waLiveStatus=document.getElementById('waLiveStatus');
  updateOpenStatus();
  if(waLiveClose && waLive){
    waLiveClose.addEventListener('click',function(){
      waLive.classList.add('hidden');
      try{sessionStorage.setItem('waLiveClosed','1');}catch(e){}
    });
    try{if(sessionStorage.getItem('waLiveClosed')==='1'){waLive.classList.add('hidden');}}catch(e){}
  }

  var galleryLightbox=document.getElementById('galleryLightbox');
  var galleryLightboxText=document.getElementById('galleryLightboxText');
  var galleryLightboxClose=document.getElementById('galleryLightboxClose');
  document.querySelectorAll('.gallery-item').forEach(function(item){
    item.addEventListener('click',function(){
      if(galleryLightboxText){galleryLightboxText.textContent=item.getAttribute('data-gallery-text')||'';}
      if(galleryLightbox){galleryLightbox.classList.add('open');}
    });
  });
  if(galleryLightboxClose){galleryLightboxClose.addEventListener('click',function(){galleryLightbox.classList.remove('open');});}
  if(galleryLightbox){galleryLightbox.addEventListener('click',function(e){if(e.target===galleryLightbox){galleryLightbox.classList.remove('open');}});}


  var portfolioProjects=[];
  var activeProjectFilter='all';
  var portfolioFoundation=document.getElementById('portfolioFoundation');

  function renderPortfolioFoundation(){
    if(!portfolioFoundation){return;}
    var portfolioSection=document.getElementById('portofolio');
    var allItems=Array.isArray(portfolioProjects)?portfolioProjects:[];
    if(portfolioSection){
      portfolioSection.classList.toggle('public-empty',allItems.length===0);
    }

    var items=allItems.filter(function(item){
      return activeProjectFilter==='all'||item.category===activeProjectFilter;
    });

    if(!items.length){
      portfolioFoundation.innerHTML='';
      return;
    }

    portfolioFoundation.innerHTML=items.map(function(item){
      return "<article class='portfolio-project'>"+
        "<div class='portfolio-project-media'><img alt='"+item.title+"' decoding='async' loading='lazy' src='"+item.image+"'/><span class='portfolio-project-badge'>"+item.category+"</span></div>"+
        "<div class='portfolio-project-body'><div class='portfolio-project-meta'><span>"+item.device+"</span><span>"+item.date+"</span><span>"+item.duration+"</span></div>"+
        "<h3>"+item.title+"</h3><p>"+item.summary+"</p><p><strong>Hasil:</strong> "+item.result+"</p></div></article>";
    }).join('');
  }

  document.querySelectorAll('[data-project-filter]').forEach(function(button){
    button.addEventListener('click',function(){
      activeProjectFilter=button.getAttribute('data-project-filter');
      document.querySelectorAll('[data-project-filter]').forEach(function(item){item.classList.remove('active');});
      button.classList.add('active');
      renderPortfolioFoundation();
    });
  });

  renderPortfolioFoundation();

  var portfolioModal=document.getElementById('portfolioModal');
  var portfolioModalClose=document.getElementById('portfolioModalClose');
  document.querySelectorAll('.portfolio-card').forEach(function(card){
    card.addEventListener('click',function(){
      document.getElementById('portfolioModalTitle').textContent=card.querySelector('h3').textContent;
      document.getElementById('portfolioModalText').textContent=card.querySelector('p').textContent;
      portfolioModal.classList.add('open');
    });
  });
  if(portfolioModalClose){portfolioModalClose.addEventListener('click',function(){portfolioModal.classList.remove('open');});}
  if(portfolioModal){portfolioModal.addEventListener('click',function(e){if(e.target===portfolioModal){portfolioModal.classList.remove('open');}});}

  var filterButtons=document.querySelectorAll('.portfolio-filter button');
  var portfolioCards=document.querySelectorAll('.portfolio-card[data-category]');
  filterButtons.forEach(function(button){
    button.addEventListener('click',function(){
      var filter=button.getAttribute('data-filter');
      filterButtons.forEach(function(btn){btn.classList.remove('active');});
      button.classList.add('active');
      portfolioCards.forEach(function(card){
        var show=filter==='all'||card.getAttribute('data-category')===filter;
        card.classList.toggle('hidden',!show);
      });
    });
  });

  var readingProgress=document.getElementById('readingProgress');
  function updateReadingProgress(){
    if(!readingProgress){return;}
    var doc=document.documentElement,scrollTop=window.pageYOffset||doc.scrollTop,scrollHeight=doc.scrollHeight-doc.clientHeight;
    readingProgress.style.width=(scrollHeight>0?(scrollTop/scrollHeight)*100:0)+'%';
  }
  updateReadingProgress();
  window.addEventListener('scroll',updateReadingProgress,{passive:true});

  var mobileNavLinks=document.querySelectorAll('.mobile-bottom-nav a');
  function updateMobileNav(){
    var current=null,offset=window.scrollY+160;
    mobileNavLinks.forEach(function(link){
      var target=document.querySelector(link.getAttribute('href'));
      if(target&&target.offsetTop<=offset){current=link;}
    });
    mobileNavLinks.forEach(function(link){link.classList.remove('active');});
    if(current){current.classList.add('active');}
    mobileNavLinks.forEach(function(link){
      if(link.classList.contains('active')){link.setAttribute('aria-current','page');}
      else{link.removeAttribute('aria-current');}
    });
  }
  updateMobileNav();
  window.addEventListener('scroll',updateMobileNav,{passive:true});

  var toast=document.getElementById('toast');
  function showToast(message){
    if(!toast){return;}
    toast.textContent=message;toast.classList.add('show');
    window.clearTimeout(window.toastTimer);
    window.toastTimer=window.setTimeout(function(){toast.classList.remove('show');},2800);
  }

  var problemCounter=document.getElementById('problemCounter');
  var resetConsultForm=document.getElementById('resetConsultForm');
  var problemInfo=document.getElementById('problemInfo');
  if(problemInfo && problemCounter){
    function updateProblemCounter(){problemCounter.textContent=problemInfo.value.length+'/600';}
    updateProblemCounter();
    problemInfo.addEventListener('input',updateProblemCounter);
  }
  if(resetConsultForm && consultForm){
    resetConsultForm.addEventListener('click',function(){
      consultForm.reset();
      if(problemCounter){problemCounter.textContent='0/600';}
      consultForm.querySelectorAll('.input-error').forEach(function(el){el.classList.remove('input-error');});
    });
  }


  var bookingProForm=document.getElementById('bookingProForm');
  var bookingProStatus=document.getElementById('bookingProStatus');
  var bookingProSummary=document.getElementById('bookingProSummary');
  var bookingProDate=document.getElementById('bookingProDate');

  function bookingProToday(){
    var now=new Date();
    return now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
  }
  if(bookingProDate){bookingProDate.min=bookingProToday();}

  function bookingProValue(id){
    var node=document.getElementById(id);
    return node?node.value.trim():'';
  }

  function bookingProValidate(){
    var required=[['bookingProName','Nama pelanggan'],['bookingProPhone','Nomor WhatsApp'],['bookingProService','Jenis layanan'],['bookingProMethod','Metode layanan'],['bookingProDate','Tanggal'],['bookingProTime','Jam'],['bookingProComplaint','Keluhan atau kebutuhan']];
    for(var i=0;i<required.length;i++){
      if(!bookingProValue(required[i][0])){return {ok:false,message:required[i][1]+' perlu diisi.'};}
    }
    var phone=bookingProValue('bookingProPhone').replace(/\D/g,'');
    if(phone.length<10||phone.length>15){return {ok:false,message:'Nomor WhatsApp belum valid.'};}
    if(bookingProValue('bookingProDate')<bookingProToday()){return {ok:false,message:'Tanggal tidak boleh di masa lalu.'};}
    return {ok:true};
  }

  function bookingProBuildSummary(){
    return 'BOOKING LAYANAN 41 COMPUTER\n'+
      'Nama: '+bookingProValue('bookingProName')+'\n'+
      'WhatsApp: '+bookingProValue('bookingProPhone')+'\n'+
      'Layanan: '+bookingProValue('bookingProService')+'\n'+
      'Metode: '+bookingProValue('bookingProMethod')+'\n'+
      'Perangkat: '+(bookingProValue('bookingProBrand')||'-')+' '+(bookingProValue('bookingProModel')||'-')+'\n'+
      'Tanggal: '+bookingProValue('bookingProDate')+'\n'+
      'Jam: '+bookingProValue('bookingProTime')+' WIB\n'+
      'Keluhan/Kebutuhan: '+bookingProValue('bookingProComplaint')+'\n\n'+
      'Mohon konfirmasi ketersediaan jadwal.';
  }

  function bookingProShowStatus(message,type){
    if(!bookingProStatus){return;}
    bookingProStatus.textContent=message;
    bookingProStatus.classList.remove('ready','error');
    if(type){bookingProStatus.classList.add(type);}
  }

  document.getElementById('bookingProPreview').addEventListener('click',function(){
    var validation=bookingProValidate();
    if(!validation.ok){bookingProShowStatus(validation.message,'error');return;}
    bookingProSummary.textContent=bookingProBuildSummary();
    bookingProShowStatus('Ringkasan siap. Periksa kembali sebelum dikirim.','ready');
  });

  document.getElementById('bookingProSend').addEventListener('click',function(){
    var validation=bookingProValidate();
    if(!validation.ok){
      bookingProShowStatus(validation.message,'error');
      return;
    }

    var sendButton=document.getElementById('bookingProSend');
    var originalText=sendButton.textContent;
    sendButton.disabled=true;
    sendButton.classList.add('is-loading');
    sendButton.textContent='Mengirim';
    bookingProShowStatus('Mengirim data booking...','ready');

    backendPost({
      action:'createBooking',
      name:bookingProValue('bookingProName'),
      whatsapp:bookingProValue('bookingProPhone'),
      service:bookingProValue('bookingProService'),
      method:bookingProValue('bookingProMethod'),
      brand:bookingProValue('bookingProBrand'),
      model:bookingProValue('bookingProModel'),
      requestDate:bookingProValue('bookingProDate'),
      requestTime:bookingProValue('bookingProTime'),
      complaint:bookingProValue('bookingProComplaint')
    }).then(function(data){
      if(!data.ok){throw new Error(data.error||'Booking gagal disimpan.');}
      var summary='ID Booking: '+data.bookingId+'\n'+bookingProBuildSummary();
      bookingProSummary.textContent=summary;
      bookingProShowStatus(
        'Booking berhasil dikirim. Nomor booking: '+data.bookingId+'. Kami akan mengonfirmasi melalui WhatsApp.',
        'ready'
      );
      window.setTimeout(function(){
        window.open('https://wa.me/6282273293245?text='+encodeURIComponent(summary),'_blank','noopener');
      },350);
    }).catch(function(){
      bookingProShowStatus(
        'Maaf, sistem sedang mengalami gangguan. Silakan hubungi kami melalui WhatsApp.',
        'error'
      );
    }).finally(function(){
      sendButton.disabled=false;
      sendButton.classList.remove('is-loading');
      sendButton.textContent=originalText;
    });
  });

  document.getElementById('bookingProReset').addEventListener('click',function(){
    bookingProForm.reset();
    bookingProSummary.textContent='Ringkasan belum dibuat.';
    bookingProShowStatus('Form telah direset.');
    bookingProDate.min=bookingProToday();
  });


  var serviceTicketInput=document.getElementById('serviceTicketInput');
  var serviceTicketLast4=document.getElementById('serviceTicketLast4');
  var serviceTicketCheck=document.getElementById('serviceTicketCheck');
  var serviceTicketResult=document.getElementById('serviceTicketResult');

  function normalizeTicket(value){
    return String(value||'').trim().toUpperCase().replace(/\s+/g,'');
  }

  function normalizeTicketStatus(value){
    var status=String(value||'').toLowerCase();
    if(status==='menunggu persetujuan'){return 'diagnosa';}
    if(status==='pengujian'){return 'pengerjaan';}
    if(status==='diambil'){return 'selesai';}
    return status;
  }

  function renderTicketProgress(status){
    var order=['diterima','diagnosa','pengerjaan','selesai'];
    var normalized=normalizeTicketStatus(status);
    var current=order.indexOf(normalized);
    return "<div class='ticket-progress'>"+order.map(function(step,index){
      var className='ticket-step';
      if(index<current){className+=' done';}
      if(index===current){className+=' active';}
      return "<div class='"+className+"'>"+step.charAt(0).toUpperCase()+step.slice(1)+"</div>";
    }).join('')+"</div>";
  }

  function showTicketResult(html,type){
    if(!serviceTicketResult){return;}
    serviceTicketResult.className='ticket-result show '+(type||'');
    serviceTicketResult.innerHTML=html;
  }

  function checkServiceTicket(){
    var id=normalizeTicket(serviceTicketInput?serviceTicketInput.value:'');
    var last4=String(serviceTicketLast4?serviceTicketLast4.value:'').replace(/\D/g,'').slice(-4);

    if(!id){
      showTicketResult("<h4>Nomor tiket belum diisi</h4><p>Masukkan nomor tiket servis terlebih dahulu.</p>",'warning');
      return;
    }
    if(last4.length!==4){
      showTicketResult("<h4>Verifikasi belum lengkap</h4><p>Masukkan 4 digit terakhir nomor WhatsApp pelanggan.</p>",'warning');
      return;
    }

    serviceTicketCheck.disabled=true;
    showTicketResult("<h4>Memeriksa status...</h4><p>Mohon tunggu sebentar.</p>",'');

    backendGet({action:'ticket',id:id,last4:last4}).then(function(data){
      if(!data.ok){throw new Error(data.error||'Tiket tidak ditemukan.');}
      var ticket=data.ticket;
      showTicketResult(
        "<h4>Status Tiket "+ticket.id+"</h4>"+
        "<div class='ticket-meta'>"+
          "<div><strong>Pelanggan</strong><span>"+ticket.customer+"</span></div>"+
          "<div><strong>Perangkat</strong><span>"+ticket.device+"</span></div>"+
          "<div><strong>Layanan</strong><span>"+ticket.service+"</span></div>"+
          "<div><strong>Diterima</strong><span>"+ticket.received+"</span></div>"+
          "<div><strong>Estimasi</strong><span>"+ticket.estimate+"</span></div>"+
          "<div><strong>Status</strong><span>"+ticket.status+"</span></div>"+
        "</div>"+
        "<p><strong>Catatan:</strong> "+(ticket.note||'-')+"</p>"+
        "<p><strong>Diperbarui:</strong> "+(ticket.updatedAt||'-')+"</p>"+
        renderTicketProgress(ticket.status),
        'success'
      );
    }).catch(function(error){
      var waText='Halo 41 COMPUTER, saya ingin menanyakan status servis dengan nomor tiket '+id+'.';
      showTicketResult(
        "<h4>Status belum dapat ditampilkan</h4>"+
        "<p>Maaf, sistem sedang mengalami gangguan atau data belum tersedia.</p>"+
        "<a class='btn btn-whatsapp' href='https://wa.me/6282273293245?text="+encodeURIComponent(waText)+"' rel='noopener noreferrer' target='_blank'>Tanyakan melalui WhatsApp</a>",
        'warning'
      );
    }).finally(function(){
      serviceTicketCheck.disabled=false;
    });
  }

  if(serviceTicketCheck){
    serviceTicketCheck.addEventListener('click',checkServiceTicket);
  }

  if(serviceTicketLast4){
    serviceTicketLast4.addEventListener('input',function(){
      serviceTicketLast4.value=serviceTicketLast4.value.replace(/\D/g,'').slice(0,4);
    });
    serviceTicketLast4.addEventListener('keydown',function(event){
      if(event.key==='Enter'){
        event.preventDefault();
        checkServiceTicket();
      }
    });
  }

  if(serviceTicketInput){
    serviceTicketInput.addEventListener('keydown',function(event){
      if(event.key==='Enter'){
        event.preventDefault();
        checkServiceTicket();
      }
    });
    serviceTicketInput.addEventListener('input',function(){
      serviceTicketInput.value=normalizeTicket(serviceTicketInput.value);
    });
  }

  var backendBookingState=document.getElementById('backendBookingState');
  var backendTicketState=document.getElementById('backendTicketState');

  function setBackendState(node,message,type){
    if(!node){return;}
    node.textContent=message;
    node.classList.remove('online','error');
    if(type){node.classList.add(type);}
  }

  function initializeBackend(){
    if(!backendConfigured()){
      setBackendState(backendBookingState,'','error');
      setBackendState(backendTicketState,'','error');
      return;
    }

    backendGet({action:'health',v:'13.8.3'}).then(function(data){
      if(!data.ok){throw new Error(data.error||'Unavailable');}
      setBackendState(backendBookingState,'','online');
      setBackendState(backendTicketState,'','online');
    }).catch(function(){
      setBackendState(backendBookingState,'','error');
      setBackendState(backendTicketState,'','error');
    });

    backendGet({action:'portfolio'}).then(function(data){
      if(data.ok && Array.isArray(data.items)){
        portfolioProjects=data.items;
        renderPortfolioFoundation();
      }
    }).catch(function(){});
  }


  var yearNode=document.getElementById('currentYear');
  if(yearNode){
    yearNode.textContent=new Date().getFullYear();
  }

  document.querySelectorAll('img').forEach(function(img){
    if(!img.hasAttribute('loading')){
      img.setAttribute('loading','lazy');
    }
    if(!img.hasAttribute('decoding')){
      img.setAttribute('decoding','async');
    }
  });

  document.querySelectorAll('a[target="_blank"]').forEach(function(link){
    var rel=link.getAttribute('rel')||'';
    if(rel.indexOf('noopener')===-1){
      rel=(rel+' noopener').trim();
    }
    if(rel.indexOf('noreferrer')===-1){
      rel=(rel+' noreferrer').trim();
    }
    link.setAttribute('rel',rel);
  });
  var privacyStorageKey='41computer_privacy_notice_v2';
  var privacyNotice=document.getElementById('privacyNotice');
  var privacyAcceptButton=document.getElementById('privacyAcceptButton');

  function privacyWasAccepted(){
    try{
      if(localStorage.getItem(privacyStorageKey)==='accepted'){return true;}
    }catch(e){}
    try{
      return document.cookie.split(';').some(function(item){
        return item.trim().indexOf(privacyStorageKey+'=accepted')===0;
      });
    }catch(e){
      return false;
    }
  }

  function permanentlyHidePrivacyNotice(){
    document.documentElement.classList.add('privacy-accepted');
    if(!privacyNotice){return;}
    privacyNotice.classList.add('is-closing','is-hidden');
    privacyNotice.setAttribute('hidden','hidden');
    privacyNotice.setAttribute('aria-hidden','true');
    window.setTimeout(function(){
      if(privacyNotice && privacyNotice.parentNode){
        privacyNotice.parentNode.removeChild(privacyNotice);
      }
    },200);
  }

  if(privacyWasAccepted()){
    permanentlyHidePrivacyNotice();
  }else if(privacyNotice){
    privacyNotice.removeAttribute('hidden');
    privacyNotice.setAttribute('aria-hidden','false');
  }

  if(privacyAcceptButton){
    privacyAcceptButton.addEventListener('click',function(event){
      event.preventDefault();
      event.stopPropagation();
      try{localStorage.setItem(privacyStorageKey,'accepted');}catch(e){}
      try{
        document.cookie=privacyStorageKey+'=accepted; path=/; max-age=31536000; SameSite=Lax';
      }catch(e){}
      permanentlyHidePrivacyNotice();
    });
  }


  var quickContactToggle=document.getElementById('quickContactToggle');
  var quickContactMenu=document.getElementById('quickContactMenu');
  var quickContactClose=document.getElementById('quickContactClose');

  function setQuickContact(open){
    if(!quickContactToggle||!quickContactMenu){return;}
    quickContactMenu.classList.toggle('open',open);
    quickContactMenu.setAttribute('aria-hidden',open?'false':'true');
    quickContactToggle.setAttribute('aria-expanded',open?'true':'false');
  }

  if(quickContactToggle){
    quickContactToggle.addEventListener('click',function(event){
      event.preventDefault();
      event.stopPropagation();
      setQuickContact(!quickContactMenu.classList.contains('open'));
    });
  }
  if(quickContactClose){
    quickContactClose.addEventListener('click',function(){
      setQuickContact(false);
    });
  }
  if(quickContactMenu){
    quickContactMenu.addEventListener('click',function(event){
      event.stopPropagation();
    });
  }
  document.addEventListener('click',function(){
    setQuickContact(false);
  });
  document.addEventListener('keydown',function(event){
    if(event.key==='Escape'){setQuickContact(false);}
  });
  document.querySelectorAll('#quickContactMenu a').forEach(function(link){
    link.addEventListener('click',function(){
      setQuickContact(false);
    });
  });

  var infoBar=document.getElementById('infoBar');
  var closeInfoBar=document.getElementById('closeInfoBar');
  if(infoBar && closeInfoBar){
    try{
      if(sessionStorage.getItem('infoBarClosed')==='1'){
        infoBar.classList.add('hidden');
      }
    }catch(e){}
    closeInfoBar.addEventListener('click',function(){
      infoBar.classList.add('hidden');
      try{sessionStorage.setItem('infoBarClosed','1');}catch(e){}
    });
  }


  document.querySelectorAll('.page-breadcrumb span:last-child').forEach(function(node){
    if(!node.textContent.trim()){node.textContent=document.title||'Halaman';}
  });

  var siteHeader=document.querySelector('.site-header');
  function updateHeaderState(){
    if(!siteHeader){return;}
    if(window.scrollY>30){
      siteHeader.classList.add('scrolled');
    }else{
      siteHeader.classList.remove('scrolled');
    }
  }
  updateHeaderState();
  window.addEventListener('scroll',updateHeaderState,{passive:true});

  var navLinks=document.querySelectorAll('.site-nav a[href^="#"]');
  var navSections=[];
  navLinks.forEach(function(link){
    var target=document.querySelector(link.getAttribute('href'));
    if(target){
      navSections.push({link:link,section:target});
    }
  });

  function updateActiveNav(){
    var current=null;
    var offset=window.scrollY+140;
    navSections.forEach(function(item){
      if(item.section.offsetTop<=offset){
        current=item;
      }
    });
    navLinks.forEach(function(link){link.classList.remove('active');});
    if(current){
      current.link.classList.add('active');
    }
  }

  updateActiveNav();
  window.addEventListener('scroll',updateActiveNav,{passive:true});






  var sendBuilderToWhatsApp=document.getElementById('sendBuilderToWhatsApp');
  if(sendBuilderToWhatsApp){
    sendBuilderToWhatsApp.addEventListener('click',function(){
      var purpose=document.getElementById('builderPurpose').options[document.getElementById('builderPurpose').selectedIndex].text;
      var budget=document.getElementById('builderBudget').options[document.getElementById('builderBudget').selectedIndex].text;
      var text='Halo 41 COMPUTER, saya ingin konsultasi rakit PC.\n\nKebutuhan: '+purpose+'\nBudget: '+budget;
      window.open('https://wa.me/6282273293245?text='+encodeURIComponent(text),'_blank','noopener');
    });
  }


  var showTimeEstimate=document.getElementById('showTimeEstimate');
  if(showTimeEstimate){
    showTimeEstimate.addEventListener('click',function(){
      var select=document.getElementById('timeService');
      document.getElementById('timeResult').textContent=select.options[select.selectedIndex].text+': sekitar '+select.value+'.';
    });
  }

  var checkServiceStatus=document.getElementById('checkServiceStatus');
  if(checkServiceStatus){
    checkServiceStatus.addEventListener('click',function(){
      var code=document.getElementById('serviceCode').value.trim().toUpperCase();
      var result=document.getElementById('trackerResult');
      result.classList.add('show');
      if(!code){
        result.textContent='Masukkan nomor servis terlebih dahulu.';
      }else if(code==='41-2026-001'){
        result.textContent='Status demo: Sedang diperiksa.';
      }else{
        result.textContent='Nomor servis belum ditemukan. Hubungi WhatsApp untuk konfirmasi.';
      }
    });
  }


  var buildConsultForm=document.getElementById('buildConsultForm');
  if(buildConsultForm){
    buildConsultForm.addEventListener('submit',function(e){
      e.preventDefault();
      var message='Halo 41 COMPUTER, saya ingin konsultasi rakit PC.\n\n';
      message+='Kebutuhan: '+document.getElementById('buildNeed').value+'\n';
      message+='Budget: '+document.getElementById('buildBudget').value+'\n';
      message+='Preferensi prosesor: '+document.getElementById('buildCpuPreference').value+'\n';
      message+='Rencana upgrade: '+document.getElementById('buildUpgradePlan').value+'\n';
      message+='Keterangan tambahan: '+(document.getElementById('buildExtra').value.trim()||'-');
      window.open('https://wa.me/6282273293245?text='+encodeURIComponent(message),'_blank','noopener');
    });
  }

  var buildRecommendation=document.getElementById('buildRecommendation');
  if(buildRecommendation){
    buildRecommendation.addEventListener('click',function(){
      var purpose=document.getElementById('builderPurpose').value;
      var budget=parseInt(document.getElementById('builderBudget').value,10);
      var result=document.getElementById('pcBuilderResult');
      var specs=[];
      if(purpose==='office'){
        specs=['Prosesor dengan grafis terintegrasi','RAM 8–16 GB','SSD 500 GB','PSU berkualitas sesuai kebutuhan'];
      }else if(purpose==='editing'){
        specs=['Prosesor multi-core','RAM minimal 16 GB','SSD 1 TB','GPU disesuaikan aplikasi editing'];
      }else{
        specs=['CPU dan GPU seimbang','RAM 16 GB','SSD 1 TB','PSU dan pendinginan memadai'];
      }
      result.innerHTML='<h3>Arah spesifikasi untuk budget Rp'+budget.toLocaleString('id-ID')+'</h3><ul>'+specs.map(function(item){return '<li>'+item+'</li>';}).join('')+'</ul>';
    });
  }


  var checkCompatibility=document.getElementById('checkCompatibility');
  if(checkCompatibility){
    checkCompatibility.addEventListener('click',function(){
      var cpu=document.getElementById('compatCpu').value;
      var board=document.getElementById('compatBoard').value;
      var storage=document.getElementById('compatStorage').value;
      var result=document.getElementById('compatibilityResult');
      result.classList.remove('ok','warn');
      if(cpu!==board){
        result.classList.add('warn');
        result.textContent='Tidak cocok: platform CPU atau jenis RAM berbeda dengan motherboard.';
      }else{
        result.classList.add('ok');
        result.textContent='Cocok secara dasar. Pastikan motherboard memiliki slot '+(storage==='nvme'?'M.2 NVMe':'SATA')+'.';
      }
    });
  }

  var calculateEstimate=document.getElementById('calculateEstimate');
  if(calculateEstimate){
    calculateEstimate.addEventListener('click',function(){
      var service=parseInt(document.getElementById('estimateService').value,10)||0;
      var qty=Math.max(1,parseInt(document.getElementById('estimateQty').value,10)||1);
      var result=document.getElementById('estimateResult');
      if(!service){result.textContent='Pilih layanan terlebih dahulu.';return;}
      var total=service*qty;
      result.textContent='Estimasi awal: Rp'+total.toLocaleString('id-ID')+'. Biaya final setelah pemeriksaan.';
    });
  }


  var openAllFaq=document.getElementById('openAllFaq');
  var closeAllFaq=document.getElementById('closeAllFaq');
  if(openAllFaq){
    openAllFaq.addEventListener('click',function(){
      document.querySelectorAll('.faq-item').forEach(function(item){
        item.classList.add('open');
        var button=item.querySelector('.faq-question');
        if(button){button.setAttribute('aria-expanded','true');}
      });
    });
  }
  if(closeAllFaq){
    closeAllFaq.addEventListener('click',function(){
      document.querySelectorAll('.faq-item').forEach(function(item){
        item.classList.remove('open');
        var button=item.querySelector('.faq-question');
        if(button){button.setAttribute('aria-expanded','false');}
      });
    });
  }

  var faqSearch=document.getElementById('faqSearch');
  var faqEmpty=document.getElementById('faqEmpty');
  if(faqSearch){
    faqSearch.addEventListener('input',function(){
      var keyword=faqSearch.value.toLowerCase().trim(),visible=0;
      document.querySelectorAll('.faq-item').forEach(function(item){
        var match=item.textContent.toLowerCase().indexOf(keyword)!==-1;
        item.style.display=match?'':'none';
        if(match){visible++;}
      });
      if(faqEmpty){faqEmpty.classList.toggle('show',visible===0);}
    });
  }

  var faqButtons=document.querySelectorAll('.faq-question');
  faqButtons.forEach(function(button){
    button.addEventListener('click',function(){
      var item=button.parentElement;
      var isOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(openItem){
        openItem.classList.remove('open');
        var openButton=openItem.querySelector('.faq-question');
        if(openButton){openButton.setAttribute('aria-expanded','false');}
      });
      if(!isOpen){
        item.classList.add('open');
        button.setAttribute('aria-expanded','true');
      }
    });
  });

  var searchToggle=document.getElementById('searchToggle');
  var searchPanel=document.getElementById('searchPanel');
  if(searchToggle && searchPanel){
    searchToggle.addEventListener('click',function(){
      var isOpen=searchPanel.classList.toggle('open');
      searchToggle.setAttribute('aria-expanded',isOpen?'true':'false');
      if(isOpen){
        var input=searchPanel.querySelector('input');
        if(input){input.focus();}
      }
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape' && searchPanel.classList.contains('open')){
        searchPanel.classList.remove('open');
        searchToggle.setAttribute('aria-expanded','false');
        searchToggle.focus();
      }
    });
  }


  window.addEventListener('resize',function(){
    if(window.innerWidth>1080 && nav){
      nav.classList.remove('open');
      toggle.textContent='☰';
      toggle.setAttribute('aria-expanded','false');
    }
  });

  document.querySelectorAll('.site-nav a[href^="#"]').forEach(function(link){
    link.addEventListener('click',function(){
      if(nav){nav.classList.remove('open');}
      if(toggle){
        toggle.textContent='☰';
        toggle.setAttribute('aria-expanded','false');
      }
    });
  });



  var BACKEND_API_URL='https://script.google.com/macros/s/AKfycbwQYp8NuyC0s8NPkxFe0cjQG_PHwXBTAijYuQc-zBCNLUVEiMC9uTgvfvix7pFkLx3syA/exec';

  function backendConfigured(){
    return BACKEND_API_URL &&
      BACKEND_API_URL.indexOf('PASTE_YOUR_APPS_SCRIPT')===-1 &&
      /^https:\/\/script\.google\.com\//.test(BACKEND_API_URL);
  }

  function backendGet(params){
    if(!backendConfigured()){
      return Promise.reject(new Error('Backend belum dikonfigurasi.'));
    }
    var query=Object.keys(params).map(function(key){
      return encodeURIComponent(key)+'='+encodeURIComponent(params[key]);
    }).join('&');
    return fetch(BACKEND_API_URL+'?'+query,{method:'GET',redirect:'follow'})
      .then(function(response){
        if(!response.ok){throw new Error('Backend tidak merespons.');}
        return response.json();
      });
  }

  function backendPost(params){
    if(!backendConfigured()){
      return Promise.reject(new Error('Backend belum dikonfigurasi.'));
    }
    var body=new URLSearchParams();
    Object.keys(params).forEach(function(key){body.append(key,params[key]);});
    return fetch(BACKEND_API_URL,{
      method:'POST',
      redirect:'follow',
      body:body
    }).then(function(response){
      if(!response.ok){throw new Error('Backend tidak merespons.');}
      return response.json();
    });
  }

  /* Jalankan backend setelah URL dan seluruh helper API siap. */
  window.setTimeout(function(){
    initializeBackend();
  },0);


  var AssetManager={
    base:'https://raw.githubusercontent.com/MaFiNas/Repository-name-41-computer-assets/main/',
    hero:'Hero-01-Workshop.jpg',
    serviceLaptop:'Service-Laptop-03-Technician.jpg',
    servicePC:'Service-PC-03-Technician.jpg',
    buildPC:'Build-PC-03-Assembly.jpg',
    upgrade:'Upgrade-SSD-04-Installation.jpg',
    windows:'Computer-Desk-01.jpg',
    cleaning:'Service-Laptop-07-Cleaning.jpg',
    about:'Workshop-02-Repair-Desk.jpg',
    portfolioBuild:'Build-PC-12-Completed.jpg',
    portfolioUpgrade:'Upgrade-SSD-04-Installation.jpg',
    portfolioService:'Service-Laptop-03-Technician.jpg',
    faqCover:'Blog-Header-02-Blue-Tech.jpg',
    areaService:'Hero-02-Technician.jpg'
  };

  function assetUrl(filename){
    return AssetManager.base+filename;
  }

  var root=document.documentElement;
  var themeToggle=document.getElementById('themeToggle');
  var savedTheme=null;
  try{
    savedTheme=localStorage.getItem('theme');
  }catch(e){}
  if(savedTheme==='dark'){
    root.setAttribute('data-theme','dark');
  }

  var systemDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)');
  if(!savedTheme && systemDark && systemDark.matches){
    root.setAttribute('data-theme','dark');
  }
  if(systemDark){
    systemDark.addEventListener('change',function(e){
      var currentSaved=null;
      try{currentSaved=localStorage.getItem('theme');}catch(err){}
      if(!currentSaved){
        if(e.matches){root.setAttribute('data-theme','dark');}
        else{root.removeAttribute('data-theme');}
        if(themeToggle){updateThemeIcon();}
      }
    });
  }

  if(themeToggle){
    function updateThemeIcon(){
      var dark=root.getAttribute('data-theme')==='dark';
      themeToggle.textContent=dark?'☀':'☾';
      themeToggle.title=dark?'Mode terang':'Mode gelap';
      themeToggle.setAttribute('aria-label',dark?'Aktifkan mode terang':'Aktifkan mode gelap');
    }
    updateThemeIcon();
    themeToggle.addEventListener('click',function(){
      var dark=root.getAttribute('data-theme')==='dark';
      if(dark){
        root.removeAttribute('data-theme');
        try{localStorage.setItem('theme','light');}catch(e){}
      }else{
        root.setAttribute('data-theme','dark');
        try{localStorage.setItem('theme','dark');}catch(e){}
      }
      updateThemeIcon();
    });
  }

  var backToTop=document.getElementById('backToTop');
  if(backToTop){
    window.addEventListener('scroll',function(){
      if(window.scrollY>500){
        backToTop.classList.add('show');
      }else{
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click',function(){
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }

  var revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.12});
    revealItems.forEach(function(item){observer.observe(item);});
  }else{
    revealItems.forEach(function(item){item.classList.add('visible');});
  }

})();





(function(){
  var storageKey='41computer_privacy_notice_v3';

  function accepted(){
    try{
      if(localStorage.getItem(storageKey)==='accepted'){return true;}
    }catch(e){}
    try{
      return document.cookie.split(';').some(function(item){
        return item.trim().indexOf(storageKey+'=accepted')===0;
      });
    }catch(e){
      return false;
    }
  }

  function removeNotice(){
    document.documentElement.classList.add('privacy-accepted');
    var notice=document.getElementById('privacyNotice');
    if(!notice){return;}
    notice.classList.add('is-closing','is-hidden');
    notice.setAttribute('hidden','hidden');
    notice.setAttribute('aria-hidden','true');
    window.setTimeout(function(){
      if(notice && notice.parentNode){
        notice.parentNode.removeChild(notice);
      }
    },180);
  }

  var notice=document.getElementById('privacyNotice');
  var button=document.getElementById('privacyAcceptButton');

  if(accepted()){
    removeNotice();
  }else if(notice){
    notice.removeAttribute('hidden');
    notice.setAttribute('aria-hidden','false');
  }

  if(button){
    button.onclick=function(event){
      event.preventDefault();
      event.stopPropagation();

      try{
        localStorage.setItem(storageKey,'accepted');
      }catch(e){}

      try{
        document.cookie=storageKey+'=accepted; path=/; max-age=31536000; SameSite=Lax';
      }catch(e){}

      removeNotice();
      return false;
    };
  }
})();



(function(){
  var form=document.querySelector('.search-form');
  var input=document.querySelector('.search-input');
  if(form && input){
    form.addEventListener('submit',function(event){
      event.preventDefault();
      var q=input.value.trim().toLowerCase();
      if(!q){return;}
      var targets=Array.prototype.slice.call(document.querySelectorAll('section h2, section h3, section p'));
      var found=targets.find(function(el){return (el.textContent||'').toLowerCase().indexOf(q)!==-1;});
      if(found){found.scrollIntoView({behavior:'smooth',block:'center'}); if(typeof showToast==='function'){showToast('Hasil ditemukan pada halaman.');}}
      else if(typeof showToast==='function'){showToast('Kata tersebut belum ditemukan pada halaman.');}
    });
  }
})();
