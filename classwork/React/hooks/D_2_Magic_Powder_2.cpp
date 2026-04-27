#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

ll n,k;
vector<ll> one,have;
bool check(ll req){
    ll kRem = k;
    for(int i = 0; i < n; i++){
        ll currReq = one[i]*req;
        kRem -= max((ll)0,currReq - have[i]);
        if(kRem < 0)return 0;
    }
    return 1;
}
int main() {
    cin>>n>>k;
    one.resize(n);
    have.resize(n);
    for(int i = 0; i < n; i++)cin>>one[i];
    for(int i = 0; i < n; i++)cin>>have[i];
    ll low = 0,high = 2e9 + 1,ans = -1;
    while(low <= high){
        ll mid = low + (high - low)/2;
        if(check(mid)){
            ans = mid;
            low = mid + 1;
        }
        else high = mid -1;
    }
    cout<<ans<<'\n';
}