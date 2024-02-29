import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  HttpException,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { ApiTags } from '@nestjs/swagger';
import { StoreDto, UpdateStoreDto, CreateStoreDto, PreUpdateStoreDto } from './dto/store.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ImageTypeValidationPipe } from './pipes/image-type-validation.pipe';
import { HttpStatus } from 'src/shared/enums/httpStatus.enum';
import { SocialNetworkDto } from './dto/social-network.dto';

@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  create(
    @UploadedFiles(new ImageTypeValidationPipe())
    files: {
      logo: Express.Multer.File;
      banner: Express.Multer.File;
    },
    @Body() createStoreDto: CreateStoreDto,
  ) {
    if (!files.logo || !files.banner) {
      throw new HttpException('Logo and banner files are required.', HttpStatus.HTTP_400_BAD_REQUEST);
    }

    const socialNetworksDto = this.parseSocialNetworks(createStoreDto.socialNetworks);

    const storeDto: StoreDto = {
      ...createStoreDto,
      logo: files.logo[0].filename,
      banner: files.banner[0].filename,
      socialNetworks: socialNetworksDto,
    };

    return this.storeService.create(storeDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.storeService.findOneByUserId(userId);
  }

  @Patch(':userId')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  update(
    @UploadedFiles(new ImageTypeValidationPipe())
    files: {
      logo?: Express.Multer.File;
      banner?: Express.Multer.File;
    },
    @Param('userId') userId: string,
    @Body() preUpdateStoreDto: PreUpdateStoreDto,
  ) {
    const socialNetworksDto = this.parseSocialNetworks(preUpdateStoreDto.socialNetworks);

    const updateStoreDto: UpdateStoreDto = {
      ...preUpdateStoreDto,
      ...(files.banner && { banner: files.banner[0].filename }),
      ...(files.logo && { logo: files.logo[0].filename }),
      ...(socialNetworksDto.length > 0 && {
        socialNetworks: socialNetworksDto,
      }),
    };

    return this.storeService.updateByUserId(userId, updateStoreDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.storeService.removeByUserId(userId);
  }

  private parseSocialNetworks(socialNetworks: string | undefined): SocialNetworkDto[] {
    if (!socialNetworks) {
      return [];
    }

    const parsedNetworks = JSON.parse(socialNetworks);

    if (!Array.isArray(parsedNetworks)) {
      throw new HttpException('Social networks is not an array.', HttpStatus.HTTP_400_BAD_REQUEST);
    }

    console.log(parsedNetworks);

    return parsedNetworks.map((network) => ({
      name: network.name,
      username: network.username,
    }));
  }
}
