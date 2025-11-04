import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { EventsModule } from './apis/events/events.module';
import { FileUploadModule } from './apis/file-upload/file-upload.module';
import { NullResponseInterceptor } from './interceptors/null-response.interceptor';
import { VersionModule } from './apis/version/version.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { ListenerModule } from './listeners/listeners.module';
import { FormFieldsModule } from './apis/formFields/formFields.module';
import { FormFieldSectionsModule } from './apis/formFieldSections/formFieldSections.module';
import { GetFormsModule } from './apis/getForms/getForms.module';
import { NotificationsModule } from './apis/notifications/notifications.module';
import { CartModule } from './apis/cart/cart.module';
import { CartitemsModule } from './apis/cartitems/cartitems.module';
import { CategoriesModule } from './apis/categories/categories.module';
import { SubcategoriesModule } from './apis/subcategories/subcategories.module';
import { DarkstoresModule } from './apis/darkstores/darkstores.module';
import { OrdersModule } from './apis/orders/orders.module';
import { ProductsModule } from './apis/products/products.module';
import { VendorsModule } from './apis/vendors/vendors.module';
import { StoreproductsModule } from './apis/storeproducts/storeproducts.module';
import { UserotpModule } from './apis/userotp/userotp.module';
import { DeliverypartnersModule } from './apis/deliverypartners/deliverypartners.module';
import { PaymentsModule } from './apis/payments/payments.module';
import { UseraddressesModule } from './apis/useraddresses/useraddresses.module';
import { MastercategoriesModule } from './apis/mastercategories/mastercategories.module';
import { BannerModule } from './apis/banner/banner.module';
import { SupportTicketsModule } from './apis/supportTickets/supportTickets.module';
import { FaqModule } from './apis/faq/faq.module';
import { ProductVarientModule } from './apis/productVarient/productVarient.module';

config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AuthModule,
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    EventsModule,
    ListenerModule,
    FileUploadModule,
    UsersModule,
    VersionModule,
    FormFieldsModule,
    FormFieldSectionsModule,
    GetFormsModule,
    NotificationsModule,
    CartModule,
    CartitemsModule,
    CategoriesModule,
    SubcategoriesModule,
    DarkstoresModule,
    OrdersModule,
    ProductsModule,
    VendorsModule,
    StoreproductsModule,
    UserotpModule,
    DeliverypartnersModule,
    PaymentsModule,
    UseraddressesModule,
    MastercategoriesModule,
    BannerModule,
    SupportTicketsModule,
    FaqModule,
    ProductVarientModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: NullResponseInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
