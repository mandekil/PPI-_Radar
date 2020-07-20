close all
clc
a=load ("pesawat.txt");
pesawat=a(1:18000);
a=load ("lapangan.txt");
lapangan=a(1:18000);
a=load ("langit.txt");
langit=a(1:18000);
a=load ("gunung.txt");
gunung=a(1:18000);
a=load ("cimall.txt");
cimall=a(1:18000);
a=load ("arhanud.txt");
arhanud=a(1:18000);

clear a
%{
[n, w, beta, ftype] = kaiserord ([0.1, 0.11], [1, 0], [0.0251, 0.03]);
b = fir1 (n, w, kaiser (n+1, beta), ftype, "noscale");
%}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

[n, w, beta, ftype] = kaiserord ([0.006, 0.007], [1, 0], [0.001, 0.001]);
b = fir1 (n, w, kaiser (n+1, beta), ftype, "noscale");
fil_ar=b.^3;
clear n w beta ftype b

[n, w, beta, ftype] = kaiserord ([0.006, 0.007], [1, 0], [0.001, 0.001]);
b = fir1 (n, w, kaiser (n+1, beta), ftype, "noscale");
fil_ci=b.^3;
clear n w beta ftype b

[n, w, beta, ftype] = kaiserord ([0.019, 0.2], [1, 0], [0.001, 0.001]);
b = fir1 (n, w, kaiser (n+1, beta), ftype, "noscale");
fil_gu=b.^3;
clear n w beta ftype b

[n, w, beta, ftype] = kaiserord ([0.024, 0.025], [1, 0], [0.001, 0.001]);
b = fir1 (n, w, kaiser (n+1, beta), ftype, "noscale");
fil_la=b.^3;
clear n w beta ftype b

[n, w, beta, ftype] = kaiserord ([0.005, 0.006], [1, 0], [0.001, 0.001]);
b = fir1 (n, w, kaiser (n+1, beta), ftype, "noscale");
fil_lap=b.^3;
clear n w beta ftype b

[n, w, beta, ftype] = kaiserord ([0.007, 0.008], [1, 0], [0.001, 0.001]);
b = fir1 (n, w, kaiser (n+1, beta), ftype, "noscale");
fil_pe=b.^3;
clear n w beta ftype b

filar = filter(fil_ar, 1, arhanud);
filci = filter(fil_ci, 1, cimall);
filgu = filter(fil_gu, 1, gunung);
filla = filter(fil_la, 1, langit);
fillap = filter(fil_lap, 1, lapangan);
filpe = filter(fil_pe, 1, pesawat);

%%%%%%%%%%%%%%%%%%%%%%%

figure(1)
subplot(2,3,1)
plot(pesawat)
subplot(2,3,2)
plot(lapangan)
subplot(2,3,3)
plot(langit)
subplot(2,3,4)
plot(gunung)
subplot(2,3,5)
plot(cimall)
subplot(2,3,6)
plot(arhanud)

figure(2)
subplot(2,3,1)
plot(abs(fft(pesawat)))
subplot(2,3,2)
plot(abs(fft(lapangan)))
subplot(2,3,3)
plot(abs(fft(langit)))
subplot(2,3,4)
plot(abs(fft(gunung)))
subplot(2,3,5)
plot(abs(fft(cimall)))
subplot(2,3,6)
plot(abs(fft(arhanud)))

figure(3)
subplot(2,3,1)
plot(filpe)
subplot(2,3,2)
plot(fillap)
subplot(2,3,3)
plot(filla)
subplot(2,3,4)
plot(filgu)
subplot(2,3,5)
plot(filci)
subplot(2,3,6)
plot(filar)

figure(4)
subplot(2,3,1)
plot(abs(fft(filpe)))
subplot(2,3,2)
plot(abs(fft(fillap)))
subplot(2,3,3)
plot(abs(fft(filla)))
subplot(2,3,4)
plot(abs(fft(filgu)))
subplot(2,3,5)
plot(abs(fft(filci)))
subplot(2,3,6)
plot(abs(fft(filar)))

clear fil_ar fil_ci fil_gu fil_la fil_lap fil_pe filar filci filgu filla fillap filpe