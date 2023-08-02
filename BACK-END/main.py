@api.route("/upload", methods=['POST'])
class Upload(Resource):
    @api.marshal_with(report_model)
    @api.expect(report_model)
    @jwt_required()
    def post(self):
        # def post(self):
        api.logger.info('in upload route')
        if request.method == 'POST':
            file_to_upload = request.files['file']
        # Updated key from 'file' to 'image'
            api.logger.info('%s image_to_upload', file_to_upload)
            if file_to_upload:
                    # Upload the image to Cloudinary
                upload_result = cloudinary.uploader.upload(file_to_upload)
                api.logger.info(upload_result)
                    # Get other form data
                title = request.form.get('title')
                description = request.form.get('description')
                location = request.form.get('location')
                    # reporter_email = request.form.get('reporter_email')
                    # Create a new Report object and save it to the database
                report = Report(
                    title=title,
                    description=description,
                    media=upload_result['url'],
                    location=location,
                        # email=email
                    )
                db.session.add(report)
                db.session.commit()
                return jsonify(upload_result)
            return jsonify({'error': 'No file provided.'}), 400
        return jsonify({'error': 'Method not allowed.'}), 405