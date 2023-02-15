%% Take and declare variables
csvfile = "./momentum/b/dynamicB.csv";
datas = dlmread(csvfile, ",", 1, 0);
allX = datas(:,1)';
t = datas(:,2)';
len = length(allX);
ix2 = ix1 = 1;
rx1 = x2 = x1 = zeros(1, len);
v2 = v1 = zeros(1, len);
graphthickness = 20;

%% Positions
for (i=1: 1: len-2)
    if (rem(i,2))
        x1(ix1++) = allX(i);
        x1(ix1++) = (allX(i) + allX(i+2)) / 2;
    else
        x2(ix2++) = allX(i);
        x2(ix2++) = (allX(i) + allX(i+2)) / 2;
    end
end
for (i=len-2: 1: len)
    x1(i) = (x1(i-1) + x1(i-2))/2;
    x2(i) = (x2(i-1) + x2(i-2))/2.24;
end

%% Velocities
for (i=2: 1: len)
    v1(i-1) = (x1(i)-x1(i-1))/(t(i)-t(i-1));
    v2(i-1) = (x2(i)-x2(i-1))/(t(i)-t(i-1));
end
v1(end) = (x1(end)-x1(end-1))/(t(end)-t(end-1));
v2(end) = (x2(end)-x2(end-1))/(t(end)-t(end-1));

%% Deduce collision
len1 = 0;
for (i=4: 1: len)
    if (abs((v2(i) - v2(i-1))) <= abs(v2(i) - v2(i-3)) && (abs(v1(i) - v1(i-1))) <= abs(v1(i)-v1(i-3)))
        len1++;
    end
end
len1 = len1 - 3;
rlen2 = len - len1;
len2 = len - len1 - 2;

%% Update position, mirror across the center of collision
midpoint = (x1(len1) + x2(len1))/2;
for (i=1: 1: len)
    rx1(i) = 2*midpoint - x1(i);
    x1(i) = rx1(i);
end

%% Update velocity
for (i=2: 1: len)
    v1(i-1) = (x1(i)-x1(i-1))/(t(i)-t(i-1));
end
v1(end) = (x1(end)-x1(end-1))/(t(end)-t(end-1));

%% Produce divided variables
v11 = v21 = t1 = zeros(1,len1);
v12 = v22 = t2 = zeros(1,len2);
rv12 = rv22 = rt2 = zeros(1,rlen2);
for (i=1: 1: len1)
    t1(i) = t(i);
    v11(i) = v1(i);
    v21(i) = v2(i);
end
for (i=1: 1: len2+1)
    t2(i) = t(i+len1+1);
    v12(i) = v1(i+len1+1);
    v22(i) = v2(i+len1+1);
end
for (i=1: 1: rlen2)
    rt2(i) = t(i+len1-1);
    rv12(i) = v1(i+len1-1);
    rv22(i) = v2(i+len1-1);
end

%% Best fit for divided variables
precision = 7;
fv11 = polyfit(t1, v11,     precision);
fv12 = polyfit(t2, v12,     precision);
fv21 = polyfit(t1, v21,     precision);
fv22 = polyfit(t2, v22,     precision);
rfv12 = polyfit(rt2, rv12,  precision);
rfv22 = polyfit(rt2, rv22,  precision);
vv11 = polyval(fv11, t1);
vv12 = polyval(fv12, t2);
vv21 = polyval(fv21, t1);
vv22 = polyval(fv22, t2);
rvv12 = polyval(rfv12, rt2);
rvv22 = polyval(rfv22, rt2);

%% Draw graphs
figure(1);
set(gca,'FontSize',32);
title('X vs T');
grid on;
hold on;
xlabel('Time (s)');
ylabel('Position (m)');
plot(t, x1, '---', 'LineWidth', graphthickness);
plot(t, x2, '---', 'LineWidth', graphthickness);
legend('x1', 'x2');
hold off;

figure(2);
set(gca,'FontSize',32);
title('V vs T');
hold on;
xlabel('Time (s)');
ylabel('Velocities (m/s)');
plot(t, v1, '---', 'LineWidth',   graphthickness);
plot(t, v2, '---', 'LineWidth',   graphthickness);
plot(t1, v11, '---', 'LineWidth', graphthickness);
plot(t2, v12, '---', 'LineWidth', graphthickness);
plot(t1, v21, '---', 'LineWidth', graphthickness);
plot(t2, v22, '---', 'LineWidth', graphthickness);
legend('v1', 'v2', 'v11', 'v12', 'v21', 'v22');
hold off;

figure(3);
set(gca,'FontSize',32);
title('Fit V vs T');
hold on;
xlabel('Time (s)');
ylabel('Fit Velocities (m/s)');
plot(t1, vv11, '---', 'LineWidth', graphthickness);
plot(t2, vv12, '---', 'LineWidth', graphthickness);
plot(t1, vv21, '---', 'LineWidth', graphthickness);
plot(t2, vv22, '---', 'LineWidth', graphthickness);
legend('vv11', 'vv12', 'vv21', 'vv22');

figure(4);
set(gca,'FontSize',32);
title('Fit rV vs T');
hold on;
xlabel('Time (s)');
ylabel('Fit Velocities (m/s)');
plot(t1, vv11, '---', 'LineWidth',   graphthickness);
plot(rt2, rvv12, '---', 'LineWidth', graphthickness);
plot(t1, vv21, '---', 'LineWidth',   graphthickness);
plot(rt2, rvv22, '---', 'LineWidth', graphthickness);
legend('vv11', 'vv12', 'vv21', 'vv22');


