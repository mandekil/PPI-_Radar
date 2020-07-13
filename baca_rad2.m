%% read i-warp textfile
clear all;%close all;
clc
% addpath ..\data_iwarp
% ------
%% file name
% fname='../data_iwarp/data12sep.bin';
% fname2=('ch0_binary_1mhz_2nd_square.bin');
% fname=('new_adc/ch0_binary_1024t_2048hz.bin');
fname=('E:\Pekerjaan\KIREI\KP KIREI\Peninggalan Ozi\data adc raw & convert\tegak_4096\adc_1572692078_0.bin');
% fname=('sampling_raw/adc_1571806586_0.bin');

fid = fopen(fname); % open file 
F_nums = fread(fid, 'uint16'); % read as signed-integer 2-byte
fclose(fid);
%% 

% fid = fopen(fname2); % open file 
% F_nums2 = fread(fid, 'uint16'); % read as signed-integer 2-byte
% fclose(fid);
% hw = hamming(8192);
% F_nums_complex = (F_nums(1:8192).*hw)+1i*(F_nums(8193:16384).*hw);

% F_nums_complex = F_nums(1:8192)+1i*F_nums(8193:16384);
% F_nums_complex = F_nums(1:4096)+1i*F_nums(4097:8192);
hasil_fft = fft(F_nums);
% hasil_fft = ifft(F_nums_complex);
% hasil_fft2 = fft(F_nums2);

absolute_fft = abs(hasil_fft);
% absolute_fft2 = abs(hasil_fft2);
absolute_fft(1)=0;
% absolute_fft2(1)=0;


reflection = 20*log10(absolute_fft(1:4096));
% reflection2 = 20*log10(absolute_fft2);

figure;plot(absolute_fft(1:length(F_nums)/2));title('FFT absolute value');xlabel('freq');ylabel('Magnitude');
title(fname);
% xlim([0,1000]);
