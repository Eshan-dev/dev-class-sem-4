#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

ll n,k;
vector<ll> arr;

bool check(ll req){
    ll op = 0;
    for(int i = n-1; i > n/2; i--){
        if(arr[i] < req){
            op += req - arr[i];
        }
    }
    if(req > arr[n/2])op += abs(req - arr[n/2]);
    return op <= k;
}
int main() {
    cin>>n>>k;
    arr.resize(n);
    for(int i = 0; i < n; i++){
        cin>>arr[i];
    }
    sort(begin(arr),end(arr));
    ll low = 0,high = 1e10;
    ll ans = -1;
    while(low<= high){
        ll mid = low + (high - low)/2;

        if(check(mid)){
            ans = mid;
            low = mid + 1;
        }
        else high = mid - 1;
    }
    cout<<ans<<'\n';
}