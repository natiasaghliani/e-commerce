import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BsketComponent } from './pages/bsket/bsket.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'basket', component: BsketComponent},
    {path: 'product/:id', component: DetailComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'about', component: AboutComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'result', component: SearchResultComponent},
    {path: 'privacy', component: PrivacyComponent},
    {path: 'terms', component: TermsComponent},
];
